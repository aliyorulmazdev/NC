import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import '../../../src/i18n';
import { useTranslation } from "react-i18next";

export default observer(function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();

  
  const {t} = useTranslation();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          prExplorer
        </Menu.Item>
        <Menu.Item name={t('products')} as={NavLink} to="/products" />



        <Menu.Item name={t('errors')} as={NavLink} to="/errors" />
        <Menu.Item header>
          <Button
            as={NavLink}
            to="/createProduct"
            positive
            content={t('createProduct')}
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Image
            src={user?.image || "/assets/user.png"}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.username}`}
                text="My Profile"
                icon="user"
              />
              <Dropdown.Item onClick={logout} text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
});
