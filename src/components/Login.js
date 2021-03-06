import React from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

const Login = (props) => {
    return (
        <div className="login">
            <Button onClick={props.login}>Login</Button>
            <Modal id="loginModal" show={props.show} onHide={props.loginHide}>
                <Modal.Header closeButton>Log In</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={props.loginSubmit}>
                        <Form.Control type="text" placeholder="Username" onChange={props.username} required/>
                        <Form.Control type="password" placeholder="Password" onChange={props.pwd} name="current-password" id="current-password" autoComplete="on" required/>
                        <center><Button type="submit">Login</Button></center>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Login