import { Card, Text} from "@nextui-org/react";
interface Props {
    Title: string;
    Content: string;
}

export default function UmlCards({Props}:{Props: Props[]})  {
    return (
        <>
            {Props.map((item:Props,index) => {
                return (
                    <Card className="hover:scale-105 hover:shadow-sm"
                        key={index}
                        css={{
                            width: "91.666667%",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            margin:"2% auto auto auto", padding:"3%", 
                            filter: "drop-shadow(0 5px 0.1rem rgb(3 105 177))"}} >
                        <Text b className=" hover:uppercase text-center 
                    ">{item.Title}</Text>
                        <Card.Body >
                            <Text>
                                {item.Content}
                            </Text>
                        </Card.Body>         
                    </Card>
                );
            })}
        </>
    );
}
