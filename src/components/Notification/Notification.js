import './Notification.scss'
import React, { Component } from 'react';
import uuid from 'react-uuid';
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import { Link } from 'react-router-dom';
import { DotPulse } from '@uiball/loaders'
import Approve from '../../assets/images/icons/Approve.svg'
import Delete from '../../assets/images/icons/Delete.svg'
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

class Notification extends Component{
    state = {
        profile: null,
        profiles: [],
        friendRequests: [],
        currentUser: null,
        friendRequestProfiles: []
    }

    componentDidMount(){
        const user = this.props.user
        const token = sessionStorage.getItem('token')
        axios.get(`${API_URL}/users/`)
        .then((response) => {
            this.setState({profiles: response.data})
        })
        axios.get(`${API_URL}/users/${user}`)
        .then((response) => {
            this.setState({profile: response.data})     
        })
        axios.get(`${API_URL}/users/${user}/friendrequests`)
        .then((response) => {
            this.setState({friendRequests: response.data})          
        })
        axios.get(`${API_URL}/users/${user}/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({currentUser: response.data.user})
            // const friendRequestProfiles = this.friendRequestProfiles()
        })
        axios.get(`${API_URL}/users/${user}/profilesandfriendrequests`)   
        .then((response) => {
            this.setState({friendRequestProfiles: response.data})                
        })
    }

    deleteFriendRequest = (event) => {
        const user = this.props.user
        const token = sessionStorage.getItem('token')
        axios.delete(`${API_URL}/users/${user}/friendrequests/${event.target.name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(
            axios.get(`${API_URL}/users/${user}/friendrequests`)
            .then((response) => {
            this.setState({friendRequests: response.data})
                axios.get(`${API_URL}/users/${user}/profilesandfriendrequests`)   
                .then((response) => {
                    this.setState({friendRequestProfiles: response.data})                
                })    
        }))
    }

    acceptFriendRequest = (event) => {
        const user = this.props.user
        const token = sessionStorage.getItem('token')
        const newFriendObjOne = {
            friends: this.state.profile.name,
            user_id: event.target.id,
            profile_id: this.state.profile.id
        }
        const newFriendID = event.target.id
        const newFriend = this.state.profiles.find((profile) => profile.id === parseInt(newFriendID))
        const newFriendObjTwo = {
            friends: newFriend.name,
            user_id: this.state.profile.id,
            profile_id: newFriend.id
        }
        axios.delete(`${API_URL}/users/${user}/friendrequests/${event.target.name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(axios.get(`${API_URL}/users/${user}/friendrequests`)
           .then((response) => {
            this.setState({friendRequests: response.data})
                axios.get(`${API_URL}/users/${user}/profilesandfriendrequests`)   
                .then((response) => {
                    this.setState({friendRequestProfiles: response.data})                
                })    
        }))
        .then(axios.post(`${API_URL}/users/${user}/friends/`, newFriendObjOne, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(axios.post(`${API_URL}/users/${user}/friends/`, newFriendObjTwo, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
    }

    render() {
    //preloader
    if (!this.state.friendRequests) {
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
        const {friendRequests, friendRequestProfiles} = this.state
        return (
            <div>
                {friendRequestProfiles.map((profile) => (
                    <div key={uuid()}>
                        <Link to={`/profile/${profile.id}`} 
                        className='notification'>
                            <div className='notification__left'>
                                <img src={profile.profilePicture? profile.profilePicture : BlankPlaceholderPhoto}
                                alt={profile.username}
                                className='notification__left--img'/>
                            </div>
                            <div className='notifiication__right'>
                                <h2 className='notification__right--name'>
                                    {profile.name}
                                </h2>
                                <p className='notification__right--about'>
                                    {profile.about}
                                </p>
                            </div>
                        </Link>
                        {friendRequests
                        .filter((request) => request.profile_id === profile.id)
                        .map((request) => (
                            <div className='approval' key={request.id}>
                                <div className='approval__left'>
                                <img src={Delete} alt='delete'
                                className='approval__left--delete'
                                name={request.id}
                                onClick={(event) => {
                                    this.deleteFriendRequest(event);
                                     this.props.updatePage()
                                }}/>
                                </div>
                                <div className='approval__right'>
                                <img src={Approve} alt='approve'
                                className='approval__right--approve'
                                id={profile.id}
                                name={request.id}
                                onClick={(event) => {
                                    this.acceptFriendRequest(event);
                                    this.props.updatePage()
                                }}/>
                                </div>
                            </div>                  
                        ))}
                    </div>                                
                ))}
    
            </div>
        );
    
    }
};

export default Notification;