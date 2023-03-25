import { Button, Card, Grid, Row, Text } from "@nextui-org/react";

export default function App(props) {

    return (
        <Grid.Container gap={2}>
            <Grid sm={12} md={5}>
                <Card css={{ mw: "330px" }}>
                    <Card.Header>
                        <Text b>{props.title}</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: "$10" }}>
                        <Text>
                            {props.text}
                        </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                        <Row justify="flex-end">
                            <Button size="sm" color="secondary">
                                See more details
                            </Button>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
        </Grid.Container>
    );
}
