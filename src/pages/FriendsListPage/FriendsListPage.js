import React, { Component } from 'react';
import './FriendsListPage.scss'
import axios from 'axios';
import { DotPulse } from '@uiball/loaders'
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import uuid from 'react-uuid';
import FriendsPreview from '../../components/FriendsPreview/FriendsPreview';
import Search from '../../assets/images/icons/search.svg'
import Back from '../../assets/images/icons/arrow_back.svg'

const API_URL = process.env.REACT_APP_API_URL

class FriendsListPage extends Component {

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

    findFriends = () => {
        const friendIds = []
        this.state.friends.forEach((friend) => {
            friendIds.push(friend.profile_id)
        })
        const friends = []
        for (let i=0;i<friendIds.length;i++) {
            for (let n=0;n<this.state.profiles.length;n++) {
                if (this.state.profiles[n].id === friendIds[i]){
                    friends.push(this.state.profiles[n])
                }
            }
        }
        return friends.sort(() => Math.random() - 0.5)
    }    

    handleInputChangeSearch = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, this.searchForFriends)
    }

    searchForFriends = () => {
        const possibleFriends = this.findFriends()
        possibleFriends.forEach((friend) => {
            friend.name = friend.name.toLowerCase()
        })
        const searchResults = possibleFriends.filter((friend) => friend.name.includes(this.state.search.toLowerCase()))
        searchResults.forEach((friend) => {
            friend.name = friend.name.charAt(0).toUpperCase() + friend.name.slice(1)
        })
        return searchResults
    }

    handleBack = () => {
        window.history.go(-1)
    }

    render() {
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
const friends = this.findFriends().slice(0, 5)
const searchResults = this.searchForFriends()
const { name, username, profilePicture, id} = this.state.profile
        return (
            <div className='friendslist'>
                <div className='friendslist__top'>
                        <img src={profilePicture? profilePicture : BlankPlaceholderPhoto}
                        alt={username}
                        className="friendslist__top--img"/>
                    <h1 className='friendslist__top--header'
                    >{name}</h1>
                </div>
                <div className='friendslist__search'>
                    <div className='friendslist__search--back'>
                        <img src={Back} alt='back'
                        className='friendslist__search--back--img'
                        onClick={this.handleBack}/>
                    </div>
                    <img src={Search} className='friendslist__search--icon' alt='search'/>
                    <input type="text" 
                    id='search'
                    name='search'
                    className='friendslist__search--input'
                    placeholder='Search by name...'
                    onChange={this.handleInputChangeSearch}
                    onClick={(event) => {event.target.placeholder = ""}}>
                    </input>
                </div>
                {!this.state.search?
                    <FriendsPreview
                    key={uuid()}
                    id={id}
                    friends={friends}
                    /> :
                    <FriendsPreview
                    key={uuid()}
                    id={id}
                    friends={this.state.search? searchResults : friends}
                    />
                }
            </div>
        );    
    }
};

export default FriendsListPage;