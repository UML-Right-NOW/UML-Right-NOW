import { TranscriptContext } from "@/contexts/TranscriptContext";
import { Button, Card, Grid, Text, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useContext } from "react";
export default function App({ propsArr }) {
    // Contexts
    const { setMajor } = useContext(TranscriptContext);
    const router = useRouter();

    // Helpers
    const handleAutocompleteChanged = (event) => {
        //setMajor(value);
        setMajor(event.target.value);
        console.log(event.target.value);
        router.push("/pathways");
    };

    return (
        <Grid.Container gap={2} justify="flex-start">
            {propsArr.map((arr, index) => {
                return (
                    <Grid xs={12} sm={3} key={index}>
                        <Card isHoverable isPressable variant="bordered" css={{ mw: "330px" }} >
                            <Card.Header className="text-center sm:text-sm lg:text-xl">
                                <Text b>{arr.major}</Text>

                            </Card.Header>
                            <Card.Divider />
                            <Card.Divider />
                            <Card.Footer>
                                <Tooltip content={"Comming soon!"} color="primary" placement="rightEnd">
                                    <Button onClick={handleAutocompleteChanged} value={arr.major} size="sm" className="bg-rowdy-blue">
                                        See more details
                                    </Button>
                                </Tooltip>
                            </Card.Footer>
                        </Card>
                    </Grid>

                );
            })}
        </Grid.Container>
    );
}
