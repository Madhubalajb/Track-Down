import React, { useState } from 'react'
import {Card, Col, Button} from 'react-bootstrap'
import habitService from '../services/habit_services'

const TrackSheet = (props) => {
    const [local_activity, setLocalActivity] = useState([])

    const handleActivity = (array, that_day) => {
        let temp = []
        if(local_activity.length === 0) {
            temp = [...array]
        }
        else {
            temp = [...local_activity]
        }
        temp.map((day, index) => {
            if(index === that_day) {
                temp[index] = !temp[index]
            }
            temp[index] = temp[index]
        })
        setLocalActivity(temp)
    }

    const countNumberOfDays = (array) => {
        let count = 0
        array.map((day, index) => {
            if(day) {
                count++
            }
        })
        return (
            <>
            {count}
            </>
        )
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
                        <Card.Subtitle>
                            <span>{habit.habit_month}</span>
                            <span className="count">No of days done - {countNumberOfDays(habit.habit_track)}/30</span>
                        </Card.Subtitle>
                        <div className="days">
                        {
                            habit.habit_track.map((day, index) => {
                                return (
                                    <Button id={index + 1} style={{ 'background-color': day === true ? 'turquoise' : '#FFEB3B'}} onClick={() => handleActivity(habit.habit_track, index)}>{index + 1}</Button>
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
            <div>
                <center className="nothing"><p>You haven't added anything to track! :(</p></center>
            </div>
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