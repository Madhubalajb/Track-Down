import React, { useState, useEffect } from 'react'
import { Row, Button } from 'react-bootstrap'
import Login from './Login'
import Signup from './Signup'
import Notification from './Notification' 
import loginService from '../services/login_services'
import signupService from '../services/signup_services'
import habitService from '../services/habit_services'

const UserService = () => {
    const [loginShow, setLoginShow] = useState(false)
    const [signupShow, setSignupShow] = useState(false)
    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const [message, setMessage] = useState('')

    const handleLoginShow = () => setLoginShow(true)
    const handleLoginHide = () => setLoginShow(false)
    const handleSignupShow = () => setSignupShow(true)
    const handleSignupHide = () => setSignupShow(false)
    const handleName = (event) => setName(event.target.value)
    const handleUsername = (event) => setUserName(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)
    
    const makeUserNull = () => {
        setName('')
        setUserName('')
        setPassword('')
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('logged-trackDown-User')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            habitService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoginShow(false)
        await loginService.login({
            username, password
        })
        .then(user => {
            window.localStorage.setItem('logged-trackDown-User', JSON.stringify(user))
            habitService.setToken(user.token)
            setUser(user)
            makeUserNull()
            showMessage(<div id="snackbar">Hello {user.username}!!</div>)
        })
        .catch(error => {
            makeUserNull()
            showMessage(<div id="snackbar">Sorry, something went wrong. Couldn't login</div>)
        })
    }

    const handleSignup = async (event) => {
        event.preventDefault()
        setSignupShow(false)
        await signupService.signup({
            name, username, password
        })  
        .then(user => {
            makeUserNull()
            showMessage(<div id="snackbar">Added user {user.username}</div>)
        })
        .catch(error => {
            makeUserNull()
            showMessage(<div id="snackbar">Sorry, something went wrong. Couldn't save user</div>)
        })
    }

    const showMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage('')
        }, 6000)
    }

    const logout = () => {
        setUser('')
        showMessage(<div id="snackbar">Bye {user.username}, will miss you!</div>)
        window.localStorage.removeItem('logged-trackDown-User')
        loginService.setToken('')
    }

    if(user === '') {
        return (
            <div>
                <Notification msg={message} />
                <Row>
                    <Login login={handleLoginShow} show={loginShow} loginHide={handleLoginHide} username={handleUsername} pwd={handlePassword} loginSubmit={handleLogin} />
                    <Signup signup={handleSignupShow} show={signupShow} signupHide={handleSignupHide} name={handleName} username={handleUsername} pwd={handlePassword} signupSubmit={handleSignup}/>
                </Row>
            </div>
        )
    }
    else {
        return (
            <div>
                <Notification msg={message} />
                <Row className="afterLogin">
                    <span className="username">{user.username}</span>
                    <Button onClick={logout}>Logout</Button>
                </Row>
            </div>
        )
    }
}

export default UserService