import './NotificationPage.scss'
import Back from '../../assets/images/icons/arrow_back.svg'
import React, { Component } from 'react';
import uuid from 'react-uuid';
import axios from 'axios';
import NotificationArea from '../../components/NotificationArea/NotificationArea';
import { DotPulse } from '@uiball/loaders'


const API_URL = process.env.REACT_APP_API_URL

class NotificationPage extends Component {

    state = {
        profile: null,
        friendRequestsLength: null,
        currentUser: null,
    }

    componentDidMount(){
        const user = this.props.match.params.user
        const token = sessionStorage.getItem('token')
        axios.get(`${API_URL}/users/${user}`)
        .then((response) => {
            this.setState({profile: response.data})
        })
        axios.get(`${API_URL}/users/${user}/friendrequests`)
        .then((response) => {
            this.setState({friendRequestsLength: response.data.length})
        })
        axios.get(`${API_URL}/users/${user}/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            this.setState({currentUser: response.data.user})
        })
    }
    
    updatePage = () => {
        this.setState({friendRequestsLength: this.state.friendRequestsLength - 1})
    }

    handleBack = () => {
        window.history.go(-1)
    }

    render(){
    //preloader
    if (!this.state.profile) {
        return (
            <div className='preloader'>
            <DotPulse 
            size={40}
            speed={1.3} 
            color="black" 
            />
            </div>
        )
    }
        return (
            <div className='notification-page'>
                <div className='notification-page__top'>
                    <div className='notification-page__top--icons'>
                        <img src={Back}
                        alt='back'
                        className="notification-page__top--icons--img"
                        onClick={this.handleBack}/>
                    </div>
                    <h1 className='notification-page__top--header'
                    >{this.state.friendRequestsLength} Friend Requests</h1>
                </div>
                <NotificationArea
                    key={uuid()}
                    user={this.props.match.params.user}
                    updatePage={this.updatePage}
                    />
            </div>
        );
    }
};

export default NotificationPage;