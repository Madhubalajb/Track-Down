import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col} from 'react-bootstrap'
import HabitForm from './HabitForm'
import TrackSheet from './TrackSheet'
import UserService from './UserService'
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
        const loggedUserJSON = window.localStorage.getItem('logged-trackDown-User')
        const user = JSON.parse(loggedUserJSON)
        if(loggedUserJSON) {
            habitService.getData()
            .then(habits => setHabitActivity(habits.filter(habit => habit.user.id === user.id)))
        }
    })

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const handleHabitName = (event) => setHabitName(event.target.value)
    const handleHabitMonth = (event) => setHabitMonth(event.target.value)
    
    const makeActivityNull = () => {
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
            makeActivityNull()
            setShow(false)
        }) 
    }
    

    return (
        <Container>
            <UserService />
            <Row className="main-row">
                <Col sm={2}>
                    <center>
                        <Card className="form-card">
                            <Card.Body>
                                <p>Add a new habit to track</p>
                                <center>
                                    <i className="material-icons" title="Add Habit" onClick={handleShow}>add_circle</i>
                                </center>
                            </Card.Body>
                        </Card>
                    </center>
                    <HabitForm show={show} close={handleClose} habit_name={handleHabitName} habit_month={handleHabitMonth} submit={submitHabit}/>
                </Col>
                <Col sm={10}>
                    <Row>
                        <TrackSheet daysInMonth={daysInMonth} habit_activity={habit_activity}/>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Home