import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col} from 'react-bootstrap'
import HabitForm from './HabitForm'
import TrackSheet from './TrackSheet'
import habitService from '../services/habit_services'

const Home = () => {
    const daysInMonth = {
        January: 31,
        February: 28,
        March: 31,
        April: 30,
        May: 31,
        June: 30,
        July: 31,
        August: 31,
        September: 30,
        October: 31,
        November: 30,
        December: 31 
    }
    const [show, setShow] = useState(false)
    const [habitName, setHabitName] = useState('') 
    const [habitMonth, setHabitMonth] = useState('')
    const [habit_activity, setHabitActivity] = useState([])

    useEffect(() => {
        habitService.getData()
        .then(data => setHabitActivity(data))
    })

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleHabitName = (event) => setHabitName(event.target.value)
    const handleHabitMonth = (event) => setHabitMonth(event.target.value)
    
    const makeStateNull = () => {
        setHabitName('')
        setHabitMonth('')
    }

    function handleActivity() {
        return new Promise((resolve, reject) => {
            const dummyArray = []
            for(let i = 1; i <= daysInMonth[habitMonth]; i++) {
                dummyArray.push(false)
            }
            if(dummyArray.length !== 0) {
                resolve(dummyArray)
            }
        })
    }
    
    const submitHabit = (event) => {
        event.preventDefault()
        handleActivity().then(data => {
            const newHabit = {
                habit_name: habitName,
                habit_month: habitMonth,
                habit_track: data
            }
            habitService.addData(newHabit)
            makeStateNull()
            setShow(false)
        }) 
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={4}>
                    <Card>
                        <Card.Body>
                            <p>Add a new habit to track</p>
                            <center>
                                <i className="material-icons" title="Add Habit" onClick={handleShow}>add_circle</i>
                            </center>
                        </Card.Body>
                    </Card>
                    <HabitForm show={show} close={handleClose} habit_name={handleHabitName} habit_month={handleHabitMonth} submit={submitHabit}/>
                </Col>
                <Col sm={8}>
                    <TrackSheet daysInMonth={daysInMonth} habit_activity={habit_activity}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home