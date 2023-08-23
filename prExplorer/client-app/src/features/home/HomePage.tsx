import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage(){
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
            <Header as='h1' inverted>
                <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                prExplorer
            </Header>
            <Header as='h2' inverted content='Welcome to productExplorer'/>
            <Button as={Link} to='/products' size='huge' inverted>
                Take me to the Products!
            </Button>
            </Container>

        </Segment>
    )
}