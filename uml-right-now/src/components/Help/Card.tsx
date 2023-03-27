import { Card, Text} from "@nextui-org/react";
import { Help_info } from "../../../lib/Help_text";

export default function Infocards() {
    return (
        <>
            {Help_info.map(text => {
                return (
                    <Card className="hover:scale-105 hover:shadow-sm"
                        key={text.Title}
                        css={{
                            width: "91.666667%",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            margin:"2% auto auto auto", padding:"3%", 
                            filter: "drop-shadow(0 5px 0.1rem rgb(3 105 177))"}} >
                        <Text b className=" hover:uppercase text-center 
                    ">{text.Title}</Text>
                        <Card.Body >
                            <Text>
                                {text.Content}
                            </Text>
                        </Card.Body>         
                    </Card>
                );
            })}
        </>
    );
}
