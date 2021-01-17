import React, { useRef, useState } from 'react'
import {Card, Col, Button} from 'react-bootstrap'
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
                <h5>{habit.habit_name} - {habit.habit_month}</h5>
                <Card.Body>
                    <i className="material-icons" title="Edit your activities" onClick={() => handleVisibility(habit.habit_track)}>edit</i>
                    {
                        habit.habit_track.map((day, index) => {
                            return (
                                <input type="button" value={index + 1} id={index + 1} onClick={() => handleActivity(index + 1)}/>
                            )
                        })
                    }
                    <Button ref={saveBtnRef} style={{visibility: 'hidden'}} onClick={() => saveChanges(habit.id)}>Save</Button>
                </Card.Body>
            </Card>
        )
    })

    if(props.habit_activity.length === 0) {
        return (
            <Card>
                <h5>Sample - January</h5>
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