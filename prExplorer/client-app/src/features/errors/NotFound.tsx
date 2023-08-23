import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment>
            <center>
            <Header icon>
                <Icon name='search'/>
                Oops - We've looked everywhere but could not find what you are looking for...
            </Header>
           
            <Segment.Inline>
                <Button as={Link} to='/products'>Return me to products page</Button>
            </Segment.Inline>
            </center>
        </Segment>
    )
}