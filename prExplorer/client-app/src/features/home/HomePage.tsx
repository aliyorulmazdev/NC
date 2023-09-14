import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import './styles.css';

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <div className="your-gradient-background">
      <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
          <Header as="h1" inverted>
            <Image
              size="massive"
              src="/assets/logo.png"
              alt="logo"
              style={{ marginBottom: 12 }}
            />
            prExplorer
          </Header>
          {userStore.isLoggedIn ? (
            <>
              <Header as="h2" inverted content="Welcome to productExplorer" />
              <Button as={Link} to="/products" size="huge" inverted>
                Go to Products!
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => modalStore.openModal(<LoginForm />)}
                size="huge"
                inverted
              >
                Login
              </Button>
              <Button
                onClick={() => modalStore.openModal(<RegisterForm />)}
                size="huge"
                inverted
              >
                Register
              </Button>
            </>
          )}
        </Container>
      </Segment>
    </div>
  );  
});
