import React, {useState} from 'react'
import {Card, Container, Button} from 'react-bootstrap'

const TrackSheet = (props) => {
    let days = []
    
    for (let i = 1; i <= props.daysInMonth[props.monthName]; i++) {
        days.push(<Button className="dayOfMonth" key={i} id={i}>{i}</Button>)
    }

    return (
        <Container>
            <Card>
                <center><h5>{props.monthName}</h5></center>
                <div className="days">
                    {
                        days.map((day, index) => {
                            if (index / 7 === 0) {
                                
                            }
                            return (
                                <span key={index}>{day}</span>
                            )
                        })
                    }
                </div>
            </Card>
        </Container>
    )
}

export default TrackSheet