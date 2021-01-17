import React, { useState } from 'react'
import {Card, Col, Button} from 'react-bootstrap'
import habitService from '../services/habit_services'

const TrackSheet = (props) => {
    const [local_activity, setLocalActivity] = useState([])

    const handleActivity = (array, that_day) => {
        if(local_activity.length === 0) {
            setLocalActivity(array)
        }
        const temp = [...local_activity]
        temp.map((day) => {
            if(day === that_day) {
                temp[that_day] = !temp[that_day]
            }
            temp[that_day] = temp[that_day]
        })
        setLocalActivity(temp)
    }

    const handleDelete = (habit_id) => {
        let confirm_delete = window.confirm('Are you sure to delete this?!')
        if(confirm_delete) {
            habitService.deleteData(habit_id)
        }
    }

    const saveChanges = (habit_id) => {
        const changes = {
            habit_track: local_activity
        }
        habitService.updateData(habit_id, changes)
        setLocalActivity([])
    }

    const showHabitActivity = () => props.habit_activity.map((habit, index) => {  
        return (
            <Col>
                <Card className="activity-card" id={index}>
                    <Card.Body >
                        <Card.Title>
                            <span>{habit.habit_name}</span> 
                            <i className="material-icons" onClick={() => handleDelete(habit.id)}>delete</i>
                        </Card.Title>
                        <Card.Subtitle>{habit.habit_month}</Card.Subtitle>
                        <div className="days">
                        {
                            habit.habit_track.map((day, index) => {
                                return (
                                    <Button id={index + 1} style={{ 'background-color': day === true ? 'blue' : '#FFEB3B'}} onClick={() => handleActivity(habit.habit_track, index)}>{index + 1}</Button>
                                )
                            })
                        }
                        <center>
                            <Button className='save' onClick={() => saveChanges(habit.id)}>Save</Button>
                        </center>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        )
    })

    if(props.habit_activity.length === 0) {
        return (
            <Card>
                <Card.Title>Sample</Card.Title>
                <Card.Subtitle>January</Card.Subtitle>
            </Card>
        )
    }
    else {
        return (
            <>
                {showHabitActivity()}
            </>
        )
    }

}

export default TrackSheet