import './LoginPage.scss'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logos/Frememberatr_logo.png'

class LoginPage extends Component {

    hidePlaceHolder = (e) => {
        e.target.placeholder = ""
    }

    resetForm = () => {
        const form = document.getElementById("login")
        form.reset()
    }

    handleLogin = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <div className='login' onClick={this.resetForm}>
                <img src={Logo} className='login__logo'/>
                <form id='login' name='login' className='login__form'>
                    <h1 className='login__form--heading'>"Friend - remember - ator"</h1>
                    <input className='login__form--username'
                    type='text'
                    placeholder='USERNAME'
                    htmlFor='login'
                    name='username'
                    id='username'
                    onClick={this.hidePlaceHolder}>
                    </input>
                    <input className='login__form--password'
                    type='text'
                    placeholder='PASSWORD'
                    htmlFor='login'
                    name='password'
                    id='password'
                    onClick={this.hidePlaceHolder}>
                    </input>
                    <input className='login__form--submit'
                    type='submit'
                    value='LOGIN'
                    onSubmit={this.handleLogin}>
                    </input>
                </form>
                <p className='login__sign-up'>Don't have an account?</p>
                <Link to="/signup" className='link'>
                <p className='login__sign-up--link'>Click here to sign up.</p>
                </Link>
            </div>
        );
    
    }
};

export default LoginPage;