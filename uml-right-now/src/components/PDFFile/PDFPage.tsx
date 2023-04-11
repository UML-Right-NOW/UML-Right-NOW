import { styled } from "@mui/material/styles";
import HeaderComponent from "./header";
//type
type Props = {
    UserName: string,
    Major:  string,
    AcademicYear: string
    children: any
}
const Page = styled("div")({
    backgroundColor: "white",
    width: "816px",
    height: "1056px",
    position: "absolute",
    top: "10%",
    left: "10%",
    
});
const SchoolYear = styled("span")({
    textAlign: "center",
    whiteSpace: "pre-wrap",
    color: "rgba(3, 105, 177, 1)",
    fontWeight: "900",
    fontSize: "20px",
    position: "absolute",
    left: "50%",
    top: "121px",
});
export default function PDFPage(Props:Props){
    return (
        <Page>
            <HeaderComponent Username={Props.UserName} Major={Props.Major}/>
            <SchoolYear>{Props.AcademicYear}</SchoolYear>
            <br/>
            {Props.children}
        </Page>
    );
}