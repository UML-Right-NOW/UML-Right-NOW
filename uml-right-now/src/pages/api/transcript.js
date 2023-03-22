/* eslint-disable @typescript-eslint/no-var-requires */

// Libraries
import formidable from "formidable";
import { PdfReader } from "pdfreader/PdfReader";
import Semester from "../../../lib/Semester";
import Course from "../../../lib/Course";

// Constants
const SEMESTER_RE = new RegExp(/\d{4} (fall|spring|summer|winter)/, "g");
const COURSE_RE = new RegExp(/[a-z]{4} [0-9]{4}[a-z]? ([a-z :.&\-()]|\d(?!\.))+ \d+\.\d+ \d+\.\d+ ([a-z]+[+-]? )?\d+\.\d+/, "g");
const TRANSCRIPT_HEADER = "beginning of undergraduate record";
const COURSE_HEADER = "course description attempted earned grade points";
const COURSE_FOOTER = "term gpa:";

export default async function handler(req, res) {
    // Ensure that the request is a POST request
    if (req.method !== "POST") {
        res.status(405).send({ message: "This route accepts only POST requests" });
        return;
    }

    // Initialize a new form
    const form = formidable();

    // Parse the PDF data from the client request
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        // Retrieve the file from the request
        const file = files["binary_data"];

        // Retrieve the file path from the file
        const filePath = file["filepath"];

        // Read the PDF file
        let pdfContents = "";
        await getPdfContents(filePath).then(res => {
            pdfContents = res;
        }).catch(err => {
            console.log(err);
        });

        // Get to the beginning of the undergraduate record (IGNORE TRANSFER CREDITS)
        const transcriptHeaderIndex = pdfContents.indexOf(TRANSCRIPT_HEADER);
        pdfContents = pdfContents.slice(transcriptHeaderIndex);

        // Parse the PDF file's contents
        const semesters = parseSemesters(pdfContents);
        debug_printSemesters(semesters);
    });

    res.status(200).send({ message: "ok" });
}

/**
 * Reads all of the text within a given PDF file into a string.
 * @param {*} filePath      The path to the PDF file to read
 * @returns                 A promise that resolves to the aforementioned string
 */
function getPdfContents(filePath) {
    return new Promise((resolve, reject) => {
        let pdfContents = "";
        new PdfReader().parseFileItems(filePath, (err, item) => {
            if (err) {
                reject();
            } else if (!item) { // Reached EOF
                resolve(pdfContents);
            } else if (item.text) { // Still parsing
                pdfContents += item.text.trim().toLowerCase() + " ";
            }
        });
    });
}

/**
 * Parses an array of semesters from a given transcript string.
 * NOTE: This function assumes that the given string begins at the beginning of an undergraduate record.
 * @param {*} str       The string from which to parse the array of semesters
 * @returns             An array of Semester objects
 */
function parseSemesters(str) {
    const it = str.matchAll(SEMESTER_RE);
    const semesters = [];
    for (;;) {
        const curr = it.next();
        if (curr.done) {
            break;
        }

        // Determine the name and index of the current semester
        const semesterIndex = curr.value.index;
        const semesterName = curr.value[0];

        // Use each semester's "course header" and "course footer" text to create a substring
        const courseHeaderSearchStartIndex = semesterIndex + semesterName.length;
        const courseHeaderIndex = str.indexOf(COURSE_HEADER, courseHeaderSearchStartIndex);
        const courseSearchStartIndex = courseHeaderIndex + COURSE_HEADER.length;
        const courseSearchEndIndex = str.indexOf(COURSE_FOOTER, courseHeaderSearchStartIndex);
        const courseSubstring = str.slice(courseSearchStartIndex, courseSearchEndIndex);

        // Parse the semester's courses
        const semesterCourses = parseCourses(courseSubstring);

        // Cache the result
        semesters.push(new Semester(semesterName, semesterCourses));
    }

    return semesters;
}

/**
 * Parses an array of courses from a given transcript substring.
 * NOTE: This function assumes that the given string lies in between the beginning and end of a semester.
 * @param {*} str       The substring from which to parse the array of courses
 * @returns             An array of Course objects
 */
function parseCourses(str) {
    const courses = [];
    const it = str.matchAll(COURSE_RE);
    for (;;) {
        const curr = it.next();
        if (curr.done) {
            break;
        }

        // Retrieve the matched string
        const courseString = curr.value[0];

        // Parse the course information from the matched string
        const course = parseCourse(courseString);

        // Cache the course
        courses.push(course);
    }

    return courses;
}

/**
 * Parses a course from a given transcript substring.
 * NOTE: This function assumes that the given string contains ONLY course data.
 * @param {*} courseString      The substring from which to parse the course
 * @returns                     A Course object
 */
function parseCourse(courseString) {
    // Convert the course string into an array
    const courseInfo = courseString.split(" ");

    // Parse the course information
    const courseCode = courseInfo[0] + " " + courseInfo[1];
    const grade = parseFloat(courseInfo[courseInfo.length - 2]);
    let courseName, creditsAttempted, creditsEarned;
    if (isNaN(grade)) { // A letter grade is present in the "Grade" column
        creditsAttempted = parseFloat(courseInfo[courseInfo.length - 4]);
        creditsEarned = parseFloat(courseInfo[courseInfo.length - 3]);
        courseName = courseInfo.slice(2, courseInfo.length - 4).join(" ");
    } else { // The "grade" was actually a float => no letter grade is present in the "Grade" column
        creditsAttempted = parseFloat(courseInfo[courseInfo.length - 3]);
        creditsEarned = parseFloat(courseInfo[courseInfo.length - 2]);
        courseName = courseInfo.slice(2, courseInfo.length - 3).join(" ");
    }     

    // Use the parsed information to initialize a new Course object
    return new Course(courseCode, courseName, creditsAttempted, creditsEarned);
}

/**
 * Pretty-prints an array of semesters.
 * NOTE: This function should be used for debugging only (not in production).
 * @param {*} semesters     An array of Semester objects
 */
function debug_printSemesters(semesters) {
    let creditsAttempted = 0;
    let creditsEarned = 0;
    semesters.forEach(semester => {
        creditsAttempted += semester.creditsAttempted;
        creditsEarned += semester.creditsEarned;
        console.log(semester.name.toUpperCase());
        console.log();
        semester.courses.forEach(course => {
            console.log(course);
        });
        console.log(`Credits Attempted: ${semester.creditsAttempted}, Credits Earned: ${semester.creditsEarned}`);
        console.log();
    });
    console.log(`Total Credits Attempted: ${creditsAttempted}, Total Credits Earned: ${creditsEarned}`);
}

// IMPORTANT: Required for formidable to work
export const config = {
    api: {
        bodyParser: false,
    },
};
