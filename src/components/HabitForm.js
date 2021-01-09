import React, {useState} from 'react'
import {Modal, Button, Row, Form, Container} from 'react-bootstrap'

const HabitForm = (props) => {
    const [selectedRadio, setSelectedRadio] = useState('')
    
    const handleSelectedRadio = (event) => setSelectedRadio(event.target.value)

    const handleRadio = (event) => {
        props.habit_month(event)
        handleSelectedRadio(event)
    }

    return (
        <Modal size="md" show={props.show} onHide={props.close} centered>
            <Modal.Header closeButton>
                <Modal.Title>Habit Tracker</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.submit}>
                    <h6><span>1</span> Take an Habit</h6>
                    <Form.Control type="text" placeholder="What are you gonna build ?" onChange={props.habit_name} required/>
                    <h6><span>2</span> Choose a month</h6>
                    <Container className="months">
                        <Row>
                            <Form.Check type="radio" value="January" label="January" checked={selectedRadio === "January"} onChange={handleRadio}/>
                            <Form.Check type="radio" value="February" label="February" checked={selectedRadio === "February"} onChange={handleRadio}/>
                            <Form.Check type="radio" value="March" label="March" checked={selectedRadio === "March"} onChange={handleRadio}/>
                            <Form.Check type="radio" value="April" label="April" checked={selectedRadio === "April"} onChange={handleRadio}/>
                        </Row>
                        <Row>
                            <Form.Check type="radio" value="May" label="May" checked={selectedRadio === "May"} onChange={handleRadio}/>
                            <Form.Check type="radio" value="June" label="June" checked={selectedRadio === "June"} onChange={handleRadio}/>
                            <Form.Check type="radio" value="July" label="July" checked={selectedRadio === "July"} onChange={handleRadio}/>
                            <Form.Check type="radio" value="August" label="August" checked={selectedRadio === "August"} onChange={handleRadio}/>
                        </Row>
                        <Row>
                            <Form.Check type="radio" value="September" label="September" checked={selectedRadio === "September"} onChange={handleRadio}/>
                            <Form.Check type="radio" value="October" label="October" checked={selectedRadio === "October"} onChange={handleRadio}/>
                            <Form.Check type="radio" value="November" label="November" checked={selectedRadio === "November"} onChange={handleRadio}/>
                            <Form.Check type="radio" value="December" label="December" checked={selectedRadio === "December"} onChange={handleRadio}/>
                        </Row>
                    </Container>
                    <center><Button type="submit">Track Down</Button></center>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default HabitForm