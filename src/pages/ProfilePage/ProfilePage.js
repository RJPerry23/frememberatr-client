import { Component } from 'react';
import axios from 'axios';
import './ProfilePage.scss'
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import PersonSearch from '../../assets/images/icons/person_search.svg'
import Friend from '../../assets/images/icons/friend.svg'
import EditOff from '../../assets/images/icons/edit_off.svg'
import Explore from '../../assets/images/icons/explore.svg'
import NotificationTrue from '../../assets/images/icons/notification_true.svg'
import NotificationFalse from '../../assets/images/icons/notification_false.svg'

const API_URL = process.env.REACT_APP_API_URL

class ProfilePage extends Component{

    state = {
        profile: null,
        likes: [],
        dislikes: [],
        friends: [],
        friendRequests: []
    }

    componentDidMount(){
        const user = this.props.match.params.user
        axios.get(`${API_URL}/users/${user}`)
        .then((response) => {
            this.setState({profile: response.data})
        })
        axios.get(`${API_URL}/users/${user}/likes`)
        .then((response) => {
            this.setState({likes: response.data})
        })
        axios.get(`${API_URL}/users/${user}/dislikes`)
        .then((response) => {
            this.setState({dislikes: response.data})
        })
        axios.get(`${API_URL}/users/${user}/friends`)
        .then((response) => {
            this.setState({friends: response.data})
        })
        axios.get(`${API_URL}/users/${user}/friendrequests`)
        .then((response) => {
            this.setState({friendRequests: response.data})
        })
    }


    render(){
    //preloader
    if (!this.state.profile) {
        return (
        <section>
            <p className='preloader'>
                ... Loading your profile ...
            </p>
        </section>
        )
    }

        const { name, username, profilePicture, id} = this.state.profile
        return(
            <div className='profile'>
                <div className='profile__top'>
                    <img src={profilePicture? profilePicture : BlankPlaceholderPhoto}
                    alt={username}
                    className="profile__top--img"/>
                    <h1 className='profile__top--header'
                    >{name}'s Profile</h1>
                </div>
                <div className='profile__middle'>
                    <div className='profile__middle--left'>
                        <div>
                            <img src={PersonSearch}
                            alt="person search"/>
                        </div>
                        <div>
                            <img src={Friend}
                            alt="friend"/>
                        </div>
                        <div>
                            <img src={EditOff}
                            alt="edit off"/>
                        </div>
                        <div>
                            <img src={Explore}
                            alt="explore"/>
                        </div>
                        {this.state.friendRequests.length?
                            <div><img src={NotificationTrue}/></div> :
                                <div><img src={NotificationFalse}/></div>}
                    </div>
                    <div className='profile__middle--right'>
                        <h2>Likes</h2>
                        {this.state.likes.map((like) => (
                            <p key={like.id}>{like.likes}</p>
                        ))}
                        <h2>Dislikes</h2>
                        {this.state.dislikes.map((dislike) => (
                            <p key={dislike.id}>{dislike.dislikes}</p>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePage;