import React from 'react'
import {Card, Col} from 'react-bootstrap'
import habitService from '../services/habit_services'

const TrackSheet = (props) => {
    const showHabitActivity = () => props.habit_activity.map((habit, index) => {
        return (
            <Card>
                <h5>{habit.habit_name} - {habit.habit_month}</h5>
                <Card.Body>
                    {
                        habit.habit_track.map((day, index) => {
                            return (
                                <input type="button" value={index + 1} id={index + 1}/>
                            )
                        })
                    }
                </Card.Body>
            </Card>
        )
    })

    if(props.habit_activity.length === 0) {
        return (
            <Col>
                <Card>
                    <h5>Sample - January</h5>
                </Card>
            </Col>
        )
    }
    else {
        return (
            <Col>
                {showHabitActivity()}
            </Col>
        )
    }

}

export default TrackSheet