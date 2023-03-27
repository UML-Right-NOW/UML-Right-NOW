
import { Avatar, Grid } from "@nextui-org/react";

export default function AvatarComp(props) {
    return (
        <div>
            <Grid.Container gap={1}>
                <Avatar
                    src={props.url}
                    css={{ size: "$20" }}
                    text={props.name} size="xl"
                />
            </Grid.Container>
        </div>

    );
}