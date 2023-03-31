import { Dropdown, Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

//import { AiFillLinkedin } from "react-icons/ai";


const SiteHeader = (Props) => {

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
                        <Dropdown.Item key="name" css={{ background: "#0369B1", justifyContent: "center", marginBottom: "$5", height: "$18" }}>
                            <Text key="name1" color="white" css={{ d: "flex", textAlign: "center" }}>
                                {Props.name}
                            </Text>
                        </Dropdown.Item>
                        <Dropdown.Item key="avatar" css={{ height: "$18", }}>
                            <Image
                                className="object-fill rounded-lg border-rowdy-blue border-4 border-double"
                                src={Props.url}
                                alt="UML Right NOW Logo"
                                width={70}
                                height={70}
                            />
                        </Dropdown.Item>
                        <Dropdown.Item key="email" css={{ height: "$18", onMouseOver: "#0Ff0" }}>
                            <Text key="emai1" color="inherit" css={{ d: "flex" }}>
                                <Link to="#" href={"mailto:" + Props.email} >
                                    <h1> Send an Email</h1>

                                </Link>
                            </Text>
                        </Dropdown.Item>
                        <Dropdown.Item key="Linkedin" css={{ height: "$18" }}>
                            <Text color="inherit" css={{ d: "flex" }}>
                                <Link href={Props.linkIn}>Reach on linkedin</Link>
                            </Text>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </Grid>
        </Grid.Container>

    )
}
export default SiteHeader;