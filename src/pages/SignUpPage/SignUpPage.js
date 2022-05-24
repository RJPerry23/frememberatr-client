import './SignUpPage.scss'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logos/Frememberatr_logo.png'
import ArrowBack from '../../assets/images/icons/arrow_back.svg'
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

class SignUpPage extends Component {

    state = {
        username: "",
        errorUsername: "",
        password: "",
        errorPassword: false,
        successProfileCreation: "",
    }

    hidePlaceHolder = (e) => {
        e.target.placeholder = ""
    }

    resetForm = () => {
        const form = document.getElementById("signup")
        form.reset()
    }

    handleChangeUsername = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {if (this.state.username.length > 0) {
            this.setState({errorUsername: false})
        }})
    }

    handleChangePassword = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {if (this.state.password.length > 0) {
            this.setState({errorPassword: false})
        }})
    }

    handleSignup = (event) => {
        event.preventDefault()
        if (this.state.username && this.state.password) {
            const newProfile = {
                username: this.state.username,
                password: this.state.password
            }
            axios.post(API_URL + '/users', newProfile)
            .then(
                this.setState({
                    successProfileCreation: "Profile successfully created",
                    errorUsername: ""
                })
            )
            .catch((err) => 
            this.setState({
                errorUsername: err.response.data,
                successProfileCreation: ""
            }))
        }
    }

    render() {
        return (
            <div className='signup' 
            //onClick={this.resetForm}
            >
                <img src={Logo} alt="Frememberatr Logo" className='signup__logo'/>
                <form id='signup' name='signup' className='signup__form'
                onSubmit={this.handleSignup}>
                    <h1 className='signup__form--heading'>"Friend - remember - ator"</h1>
                    <input className='signup__form--username'
                    type='text'
                    placeholder='Please enter a username'
                    name='username'
                    id='username'
                    onClick={this.hidePlaceHolder}
                    onChange={this.handleChangeUsername}>
                    </input>
                    <input className='signup__form--password'
                    type='password'
                    placeholder='Please enter a password'
                    name='password'
                    id='password'
                    onClick={this.hidePlaceHolder}
                    onChange={this.handleChangePassword}>
                    </input>

                    {this.state.successProfileCreation ?
                      <p className={"signup__form--success"}>
                        {this.state.successProfileCreation}
                      </p> :
                            this.state.errorUsername ?
                            <p className={"signup__form--error"}>
                            {this.state.errorUsername}
                            </p> : null}

                   

                    <div className='signup__form--bottom'>
                        <div className="signup__form--bottom--back">
                            <Link to="/" className='link'>
                                <img src={ArrowBack} 
                                alt="Back arrow"
                                className="signup__form--bottom--back--icon"/>
                            </Link>
                        </div>
                        <input className='signup__form--bottom--submit'
                                type='submit'
                                value='Submit'>
                        </input>
                    </div>
                    
                </form>
            </div>
        );
    
    }
};

export default SignUpPage;