import React, { useState } from 'react'
import { Container, Card } from 'react-bootstrap'
import HabitForm from './HabitForm'
import TrackSheet from './TrackSheet'
import habitService from '../services/habit_services'

const Home = () => {
    const [show, setShow] = useState(false)
    const [habitName, setHabitName] = useState('') 
    const [habitMonth, setHabitMonth] = useState('')

    const handleHabitName = (event) => setHabitName(event.target.value)
    const handleHabitMonth = (event) => setHabitMonth(event.target.value)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const makeStateNull = () => {
        setHabitName('')
        setHabitMonth('')
    }
    
    const submitHabit = (event) => {
        event.preventDefault()
        const newHabit = {
            name: habitName,
            month: habitMonth
        }
        habitService.addData(newHabit)
        makeStateNull()
        setShow(false)
    }

    return (
        <Container>
            <center>
                <Card>
                    <Card.Body>
                        <p>Add a new habbit to track</p>
                        <center>
                            <i className="material-icons" title="Add Habit" onClick={handleShow}>add_circle</i>
                        </center>
                    </Card.Body>
                </Card>
                <HabitForm show={show} close={handleClose} habit_name={handleHabitName} habit_month={handleHabitMonth} submit={submitHabit}/>
                <TrackSheet monthName={habitMonth} />
            </center>
        </Container>
    )
}

export default Home