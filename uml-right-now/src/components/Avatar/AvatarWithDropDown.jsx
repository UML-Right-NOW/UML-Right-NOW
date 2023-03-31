import { Avatar, Dropdown, Grid, Text } from "@nextui-org/react";
import logo from "../../../assets/logo.png";

export default function App(Props) {
    const im = logo + "";
    return (
        <Grid.Container className="p-20" justify="flex-start" gap={2}>
            <Grid>
                <Dropdown placement="bottom-left">
                    <Dropdown.Trigger>
                        <Avatar
                            bordered
                            size="lg"
                            as="button"
                            color="secondary"
                            src="./logo.png"
                        />
                    </Dropdown.Trigger>
                    <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
                        <Dropdown.Item key={Props.key} css={{ height: "$18" }}>
                            <Text b color="inherit" css={{ d: "flex" }}>
                                {Props.linkIn}
                            </Text>
                            <Text b color="inherit" css={{ d: "flex" }}>
                                {Props.email}
                            </Text>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Grid>
        </Grid.Container>
    );
}
