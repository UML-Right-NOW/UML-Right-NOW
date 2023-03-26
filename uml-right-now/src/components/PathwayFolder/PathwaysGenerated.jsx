import { Button, Card, Grid, Text } from "@nextui-org/react";

export default function App({ propsArr }) {
    return (
        <Grid.Container gap={2} justify="flex-start">
            {propsArr.map((arr, index) => {
                return (
                    <Grid xs={12} sm={3} key={index}>
                        <Card isHoverable isPressable variant="bordered" css={{ mw: "330px" }} >
                            <Card.Header className="text-center sm:text-sm lg:text-xl">
                                <Text b>{arr.title}</Text>
                            </Card.Header>
                            <Card.Divider />
                            <Card.Body css={{ py: "$10" }} color="secondary">
                                <Text className="text-center sm:text-sm lg:text-xl">
                                    {arr.text}
                                </Text>
                            </Card.Body>
                            <Card.Divider />
                            <Card.Footer>
                                <Button size="sm" className="bg-rowdy-blue">
                                    See more details
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Grid>

                );
            })}
        </Grid.Container>
    );
}
