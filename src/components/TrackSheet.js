import React, { useRef, useState } from 'react'
import {Card, Button} from 'react-bootstrap'
import habitService from '../services/habit_services'

const TrackSheet = (props) => {
    const [local_activity, setLocalActivity] = useState([])
    const saveBtnRef = useRef(null)
    
    const handleVisibility = (array) => {
        setLocalActivity(array)
        saveBtnRef.current.style.visibility = 'visible'
    } 

    const handleActivity = (day) => {
        const temp = [...local_activity]
        temp[day] = !temp[day]
        setLocalActivity(temp)
    }

    const saveChanges = (habit_id) => {
        const changes = {
            habit_track: local_activity
        }
        habitService.updateData(habit_id, changes)
        setLocalActivity([])
        saveBtnRef.current.style.visibility = 'hidden'
    }

    const showHabitActivity = () => props.habit_activity.map((habit, index) => {  
        return (
            <Card>
                <Card.Body className="activity_card">
                    <Card.Title>{habit.habit_name}</Card.Title>
                    <Card.Subtitle>{habit.habit_month}</Card.Subtitle>
                    <div className="days">
                        <i className="material-icons" title="Edit your activities" onClick={() => handleVisibility(habit.habit_track)}>edit</i>
                    {
                        habit.habit_track.map((day, index) => {
                            return (
                                <Button id={index + 1} style={{ 'background-color': day === true ? 'blue' : '#FFEB3B'}} onClick={() => handleActivity(index)}>{index + 1}</Button>
                            )
                        })
                    }
                    </div>
                    <center>
                        <Button ref={saveBtnRef} style={{visibility: 'hidden'}} className='save' onClick={() => saveChanges(habit.id)}>Save</Button>
                    </center>
                </Card.Body>
            </Card>
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