import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const Signup = (props) => {
    return (
        <div className="signup">
            <Button onClick={props.signup}>Signup</Button>
            <Modal id="signupModal" show={props.show} onHide={props.signupHide}>
                <Modal.Header closeButton>Sign Up</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={props.signupSubmit}>
                        <Form.Control type="text" placeholder="Name" onChange={props.name} required/>
                        <Form.Control type="text" placeholder="Username" onChange={props.username} required/>
                        <Form.Control type="password" placeholder="Password" onChange={props.pwd} required/>
                        <center><Button type="submit">SignUp</Button></center>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Signup