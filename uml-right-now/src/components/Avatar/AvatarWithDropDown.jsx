import { Dropdown, Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

export default function App(Props) {

    return (
        <Grid.Container justify="flex-start" gap={2}>
            <Grid>
                <Dropdown placement="bottom-left">
                    <Dropdown.Trigger>
                        <Image
                            className="rounded-full border-white border-2"
                            src={Props.url}
                            alt="UML Right NOW Logo"
                            width={50}
                            height={50}
                        />

                    </Dropdown.Trigger>
                    <Dropdown.Menu color="green" aria-label="Avatar Actions">
                        <Dropdown.Item key={Props.key} css={{ background: "#0369B1", justifyContent: "center", marginBottom: "$5", height: "$18" }}>
                            <Text color="white" css={{ d: "flex", textAlign: "center" }}>
                                {Props.name}
                            </Text>
                        </Dropdown.Item>
                        <Dropdown.Item key={Props.key} css={{ height: "$18", }}>
                            <Image
                                className="object-fill rounded-lg border-rowdy-blue border-4 border-double"
                                src={Props.url}
                                alt="UML Right NOW Logo"
                                width={70}
                                height={70}
                            />
                        </Dropdown.Item>
                        <Dropdown.Item key={Props.key} css={{ height: "$18", onMouseOver: "#0Ff0" }}>
                            <Text b color="inherit" css={{ d: "flex" }}>
                                <Link to="#" href={"mailto:" + Props.email} >
                                    <AiOutlineMail /> Send an Email
                                </Link>
                            </Text>
                        </Dropdown.Item>
                        <Dropdown.Item key={Props.key} css={{ height: "$18" }}>
                            <Text b color="inherit" css={{ d: "flex" }}>
                                <Link href={Props.linkIn}><AiFillLinkedin /> :Reach on linkedin</Link>
                            </Text>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </Grid>
        </Grid.Container>
    );
}
