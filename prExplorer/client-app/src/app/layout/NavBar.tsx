import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";


export default function NavBar() {

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' header>
            <img src='/assets/logo.png' alt='logo' style={{marginRight: '10px'}} />
            prExplorer
            </Menu.Item>
        <Menu.Item name='Products' as={NavLink} to='/products' />
        <Menu.Item header>
            <Button as={NavLink} to='/createProduct' positive content='Create Product' />
        </Menu.Item>
      </Container>
    </Menu>
  )
}
