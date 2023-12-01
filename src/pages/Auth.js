import React, { useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer (() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    console.log(location.pathname)

    const click = async () => {
        try {
            let data;
            if(isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
            <Container 
                className="d-flex justify-content-center align-items-center"
                style={{height:window.innerHeight - 54}}
            >
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-5"
                            placeholder="Введите email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row className="d-flex justify-content-between mt-3" style={{margin:'0'}}>
                            { isLogin ?
                                <div style={{width:'auto', paddingLeft:"0"}}>
                                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                                </div>
                                :
                                <div style={{width:'auto', paddingLeft:"0"}}>
                                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                </div>
                            }
                            
                            <Button 
                                variant={"outline-success"} 
                                style={{width:'auto'}}
                                onClick={click}
                            >
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </Row>
                    </Form>
                </Card>
            </Container>
        </div>
    )
})

export default Auth