import './DiscoverPage.scss'
import axios from 'axios';
import React, { Component } from 'react';
import { DotPulse } from '@uiball/loaders'
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import ProfilePreview from '../../components/ProfilePreview/ProfilePreview';
import uuid from 'react-uuid';

const API_URL = process.env.REACT_APP_API_URL

class DiscoverPage extends Component{

    state = {
        profile: null,
        profiles: [],
        likes: [],
        dislikes: [],
        friends: [],
        friendRequests: []
    }

    componentDidMount(){
        const user = this.props.match.params.user
        axios.get(`${API_URL}/users/`)
        .then((response) => {
            this.setState({profiles: response.data})
        })
        axios.get(`${API_URL}/users/${user}`)
        .then((response) => {
            this.setState({profile: response.data})
        })
        axios.get(`${API_URL}/users/${user}/friends`)
        .then((response) => {
            this.setState({friends: response.data})
        })
        axios.get(`${API_URL}/users/${user}/likes`)
        .then((response) => {
            this.setState({likes: response.data})
        })
        axios.get(`${API_URL}/users/${user}/dislikes`)
        .then((response) => {
            this.setState({dislikes: response.data})
        })
        axios.get(`${API_URL}/users/${user}/friendrequests`)
        .then((response) => {
            this.setState({friendRequests: response.data})
        })
    }


    findPossibleFriends = () => {
        const user = this.state.profile.id
        const profiles = []
        this.state.profiles.forEach((profile) => {
            if (profile.id !== user) {
                profiles.push(profile.id)
            }
        })
        const friends = []
        for (let i=0;i<this.state.friends.length;i++) {
            friends.push(this.state.friends[i].profile_id)
        }
        for (let j=0;j<friends.length;j++) {
            if (profiles.includes(friends[j])){
                profiles.splice(profiles.indexOf(friends[j]), 1)
            }
        }
        const possibleProfiles = []
        for (let r=0;r<profiles.length;r++){
            for (let n=0;n<this.state.profiles.length;n++) {
                if (this.state.profiles[n].id === profiles[r]){
                    possibleProfiles.push(this.state.profiles[n])
                }
            }
        }
        return possibleProfiles.sort(() => Math.random() - 0.5)
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
    const newPossibleFriends = this.findPossibleFriends();
    console.log(newPossibleFriends);
    const { name, username, profilePicture, id} = this.state.profile
        return (
            <div className='profile'>
                <div className='profile__top'>
                    <img src={profilePicture? profilePicture : BlankPlaceholderPhoto}
                    alt={username}
                    className="profile__top--img"/>
                    <h1 className='profile__top--header'
                    >{name}</h1>
                </div>

                <input type="text"></input>

                <div>
                    <ProfilePreview
                    key={uuid()}
                    id={id}
                    newfriends={newPossibleFriends}
                    />
                </div>
            </div>
        );    
    }
};

export default DiscoverPage;