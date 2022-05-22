import './DiscoverPage.scss'
import axios from 'axios';
import React, { Component } from 'react';
import { DotPulse } from '@uiball/loaders'
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import ProfilePreview from '../../components/ProfilePreview/ProfilePreview';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';
import Search from '../../assets/images/icons/search.svg'

const API_URL = process.env.REACT_APP_API_URL

class DiscoverPage extends Component{

    state = {
        profile: null,
        profiles: [],
        likes: [],
        dislikes: [],
        friends: [],
        friendRequests: [],
        search: ""
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

    handleInputChangeSearch = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, this.searchForFriends)
    }

    searchForFriends = () => {
        const possibleFriends = this.findPossibleFriends()
        possibleFriends.forEach((friend) => {
            friend.name = friend.name.toLowerCase()
        })
        const searchResults = possibleFriends.filter((friend) => friend.name.includes(this.state.search.toLowerCase()))
        searchResults.forEach((friend) => {
            friend.name = friend.name.charAt(0).toUpperCase() + friend.name.slice(1)
        })
        return searchResults
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
    const newPossibleFriends = this.findPossibleFriends().slice(0, 5);
    const searchResults = this.searchForFriends()
    const { name, username, profilePicture, id} = this.state.profile
        return (
            <div className='discover'>
                <div className='discover__top'>
                    <Link to={`/profile/${this.state.profile.id}`}>
                        <img src={profilePicture? profilePicture : BlankPlaceholderPhoto}
                        alt={username}
                        className="discover__top--img"/>
                    </Link>
                    <h1 className='discover__top--header'
                    >{name}</h1>
                </div>
                <div className='discover__search'>
                    <img src={Search} className='discover__search--icon' alt='search'/>
                    <input type="text" 
                    id='search'
                    name='search'
                    className='discover__search--input'
                    placeholder='Search by name...'
                    onChange={this.handleInputChangeSearch}
                    onClick={(event) => {event.target.placeholder = ""}}>
                    </input>
                </div>
                {!this.state.search?
                    <ProfilePreview
                    key={uuid()}
                    id={id}
                    newfriends={newPossibleFriends}
                    /> :
                    <ProfilePreview
                    key={uuid()}
                    id={id}
                    newfriends={this.state.search? searchResults : newPossibleFriends}
                    />
                }
            </div>
        );    
    }
};

export default DiscoverPage;