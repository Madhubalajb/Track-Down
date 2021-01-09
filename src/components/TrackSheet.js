import React, {useState} from 'react'
import {Card, Container, Button} from 'react-bootstrap'

const TrackSheet = (props) => {
    let days = []
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
    
    for (let i = 1; i <= daysInMonth[props.monthName]; i++) {
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