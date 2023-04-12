import * as dotenv from "dotenv";
import formidable from "formidable";
import { PdfReader } from "pdfreader/PdfReader";
import Course from "../../../lib/Course";

// Load environment variables
dotenv.config();

// Constants
const COURSE_RE = new RegExp(/[a-z]{4} [0-9]{4}[a-z]? ([a-z :.&\-()]|\d(?!\.))+ \d+\.\d+ \d+\.\d+ ([a-z]+[+-]? )?\d+\.\d+/, "g");
const TRANSFER_RE = new RegExp(/[a-z]{4} [0-9]{4}[a-z]? ([a-z :.&\-()]|\d(?!\.))+ \d+\.\d+ t/, "g");

export default async function handler(req, res) {
    // Ensure that the request is a POST request
    if (req.method !== "POST") {
        res.status(405).send({ message: "This route accepts only POST requests" });
        return;
    }

    // Parse the form sent from the client
    let pdfContents = "";
    await parseForm(req).then(res => {
        pdfContents = res;
    }).catch(err => {
        res.status(500).send({ message: err });
        return;
    });

    // Parse the PDF file's contents
    const courses = parseCourses(pdfContents);

    // Display the results of the parse in development environemnts only
    if (process.env.NODE_ENV === "development") {
        debug_printCourses(courses);
    }

    // Respond to the frontend
    res.status(200).json({ courses: courses });
}

/**
 * Reads a form contained within a given request from the client, parses the PDF
 * file contained within this form, and returns its contents as a string.
 * @param {*} req   The request from the client 
 * @returns         A promise that resolves to the PDF string
 */
function parseForm(req) {
    // Initialize a new form
    const form = formidable();

    // Parse the PDF data from the client request
    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err);
            }

            // Retrieve the file from the request
            const file = files["binary_data"];

            // Retrieve the file path from the file
            const filePath = file["filepath"];

            // Read the PDF file
            await getPdfContents(filePath).then(res => {
                resolve(res);
            }).catch(innerErr => {
                reject(innerErr);
            });
        });
    });
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
                reject(err);
            } else if (!item) { // Reached EOF
                resolve(pdfContents);
            } else if (item.text) { // Still parsing
                pdfContents += item.text.trim().toLowerCase() + " ";
            }
        });
    });
}

/**
 * Parses an array of courses from a given string.
 * @param {*} str       The substring from which to parse the array of courses
 * @returns             The array of parsed courses
 */
function parseCourses(str) {
    // Parse courses
    const transferCourses = parseTransferCourses(str);
    const regularCourses = parseRegularCourses(str); 

    return transferCourses.concat(regularCourses);
}

/**
 * Parses an array of transfer courses from a given string.
 * @param {*} str       The string from which to parse the array of transfer courses
 * @returns             The array of parsed transfer courses
 */
function parseTransferCourses(str) {
    // Initialization
    const transferCourses = [];

    // Iterate over each matched transfer course
    const transferIterator = str.matchAll(TRANSFER_RE);
    for (let curr = transferIterator.next(); !curr.done; curr = transferIterator.next()) {
        // Retrieve the matched string
        const transferCourseString = curr.value[0];

        // Parse the transfer course information from the matched string
        const transferCourse = parseTransferCourse(transferCourseString);

        // Cache the transfer course
        transferCourses.push(transferCourse);
    }

    return transferCourses;
}

/**
 * Parses a transfer course string to obtain the data required to initialize a Course object.
 * @param {*} transferCourseString      The transfer course string to parse
 * @returns                             The initialized Course object
 */
function parseTransferCourse(transferCourseString) {
    // Convert the transfer course string into an array
    const transferCourseInfo = transferCourseString.split(" ");

    // Parse the transfer course information
    const courseCode = transferCourseInfo[4] + "." + transferCourseInfo[5];
    const creditsAttempted = parseFloat(transferCourseInfo[transferCourseInfo.length - 2]);
    const creditsEarned = creditsAttempted;
    const courseName = transferCourseInfo.slice(6, transferCourseInfo.length - 2).join(" ");

    // Used the parsed transfer course information to initialize a new Course object
    return new Course(courseCode, courseName, creditsAttempted, creditsEarned);
}

/**
 * Parses an array of regular (non-transfer) courses from a given string.
 * @param {*} str       The string from which to parse the array of regular courses
 * @returns             The array of regular courses
 */
function parseRegularCourses(str) {
    // Initialization
    const courses = [];

    // Iterate over each matched course
    const courseIterator = str.matchAll(COURSE_RE);
    for (let curr = courseIterator.next(); !curr.done; curr = courseIterator.next()) {
        // Retrieve the matched string
        const courseString = curr.value[0];

        // Parse the course information from the matched string
        const course = parseRegularCourse(courseString);

        // Cache the course
        courses.push(course);
    }

    return courses;
}

/**
 * Parses a course string to obtain the data required to intialize a Course object
 * @param {*} courseString      The course string to parse
 * @returns                     The initialized Course object
 */
function parseRegularCourse(courseString) {
    // Convert the course string into an array
    const courseInfo = courseString.split(" ");

    // Parse the course information
    const courseCode = courseInfo[0] + "." + courseInfo[1];
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
 * Prints a given array of courses.
 * NOTE: For use in debugging only.
 * @param {*} courses   The array of courses to print
 */
function debug_printCourses(courses) {
    // Initialization
    let creditsAttempted = 0, creditsEarned = 0;

    // Iterate over each course
    courses.forEach(course => {
        // Add the current course's stats to the running sums
        creditsAttempted += course.creditsAttempted;
        creditsEarned += course.creditsEarned;

        // Display the course
        console.log(course);
    });

    // Display the running sums
    console.log(`Credits Attempted: ${creditsAttempted}, Credits Earned: ${creditsEarned}`);
}

// IMPORTANT: Required for formidable to work
export const config = {
    api: {
        bodyParser: false,
    },
};
