import React, { useContext } from "react";
import { Context } from "../index";
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { NavLink } from "react-router-dom";
import {LOGIN_ROUTE, ADMIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import {Button} from 'react-bootstrap'
import {observer} from "mobx-react-lite"
import { useNavigate } from "react-router-dom";

const NavBar = observer (() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
    }

    return (
      <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{color:'white'}} to={SHOP_ROUTE}>КупиДевайс</NavLink>
        {user.isAuth ?
          <Nav className="ml-auto" style={{color:'white'}}>
            <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
            <Button variant={"outline-light"} onClick={() => logOut()} style={{'margin-left':'10px'}}>Выйти</Button>
          </Nav>
          :
          <Nav className="ml-auto" style={{color:'white'}}>
            <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
          </Nav>
        }
      </Container>
    </Navbar>
    )
}
)
export default NavBar;