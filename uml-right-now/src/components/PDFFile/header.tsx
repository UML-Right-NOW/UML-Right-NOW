import { styled } from "@mui/material/styles";
import logo from "../../../assets/logo.png";
import Image from "next/image";
//type
type Props = {
Username: string,
Major: string
}
// Components
const Header = styled("div")({
    display: "flex",
    position: "relative",
    padding: "0px",
    width: "722px",
    height: "99px",
    left: "0px",
    top: "0px",
});
const Title = styled("div")({
    textAlign: "left",
    whiteSpace: "pre-wrap",
    fontSize: "24px",
    letterSpacing: "4.8px",
    width: "285px",
    height: "20px",
    position: "absolute",
    left: "230px",
    top: "55px",
});
const HeaderBar = styled("div")({
    backgroundColor: "black",
    width: "678px",
    height: "2px",
    position: "absolute",
    top: "90px",
    left: "30px",
});  
const InnerText = styled("div") ({
    textAlign: "left",
    fontSize: "12px",
    width: "160px",
    height: "25px",
    position: "absolute",
    left: "370px",
    top: "-20px",
});
export default function HeaderComponent(Props: Props){
    return (
        <Header>
            <Image src={logo} width={100} alt="UML Right now logo" />
            <Title>Generated Pathway
                <InnerText>
                    {Props.Username}
                    <br/>
                    {Props.Major}
                </InnerText>
            </Title>    
            <HeaderBar />
        </Header>

    );
}