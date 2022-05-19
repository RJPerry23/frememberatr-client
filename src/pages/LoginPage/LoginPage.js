import './LoginPage.scss'
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../../assets/images/logos/Frememberatr_logo.png'
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

class LoginPage extends Component {

    state = {
      animationClass: 'test',
      logInError: "",
      logInSuccess: false,
      userId: null,
      // flashErrorMessage: false,
      // flasher: false
    }

    //For background animation
    constructor (props) {
        super(props);
        this.state = {
          animationClass: 'test'
        }
        this.animationState = this.animationState.bind(this);
      }
      
      animationState(){
        if(this.state.animationClass === 'test'){
          this.setState({
            animationClass: 'test paused'
          });
        }else{
          this.setState({
            animationClass: 'test'
          });
        }
      }  

    hidePlaceHolder = (event) => {
        event.target.placeholder = ""
    }

    handleLogin = (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
      axios.post(API_URL + '/users/login', {
        username,
        password
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token)
        this.setState({
          success: true,
          logInError: "",
          userId: response.data.id
        })
      })
      .catch((err) => {
        this.setState({
          logInError: err.response.data,
        })
      })
    }

    render() {
        return (
            <div className='login'>
                <div className={this.state.animationClass}>
                <img src={Logo} alt="Frememberatr logo" className='login__logo'/>
                <form id='login' name='login' className='login__form'
                onSubmit={this.handleLogin}>
                    <h1 className={this.state.animationClass === "test"?
                    'login__form--heading' :
                    'login__form--heading--alt'}>
                      "Friend - remember - ator"
                      </h1>
                    <input className={this.state.animationClass === "test"?
                    'login__form--username' :
                    'login__form--username--alt'}
                    type='text'
                    placeholder='Username'
                    htmlFor='login'
                    name='username'
                    id='username'
                    onClick={this.hidePlaceHolder}>
                    </input>
                    <input className={this.state.animationClass === "test"?
                    'login__form--password' :
                    'login__form--password--alt'}
                    type='text'
                    placeholder='Password'
                    htmlFor='login'
                    name='password'
                    id='password'
                    onClick={this.hidePlaceHolder}>
                    </input>

                    {this.state.logInError &&
                      <p className={"login__error"}>
                        {this.state.logInError}
                      </p>}

                    <input className={this.state.animationClass === "test"?
                    'login__form--submit' :
                    'login__form--submit--alt'}
                    type='submit'
                    value='Login'
                    >
                    </input>
                </form>

                {this.state.success && <Redirect to={"/profile/" + this.state.userId} />}


                <div className='login__bottom'>
                    <p className={this.state.animationClass === "test"?
                    'login__bottom--sign-up' :
                    'login__bottom--sign-up--alt'}>
                      Don't have an account?
                      </p>
                    <Link to="/signup" className='link'>
                    <p className={this.state.animationClass === "test"?
                    'login__bottom--sign-up--link' : 
                    'login__bottom--sign-up--link--alt'}>
                      Click here to sign up.
                      </p>
                    </Link>

                        {this.state.animationClass === "test"? 
                            <button className='login__bottom--button'
                            onClick={this.animationState}>
                            Normal Mode
                            </button> :
                                <button className='login__bottom--button--alt'
                                onClick={this.animationState}>
                                Color Mode </button>}

                </div>
              </div>
            </div>
        );
    
    }
};

export default LoginPage;