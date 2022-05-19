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
import { DotPulse } from '@uiball/loaders'
import { Link } from 'react-router-dom';


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
            <div className='preloader'>
            <DotPulse 
            size={40}
            speed={1.3} 
            color="black" 
            />
            </div>
        )
    }

        const { name, username, profilePicture} = this.state.profile
        return(
            <div className='profile'>
                <div className='profile__top'>
                    <img src={profilePicture? profilePicture : BlankPlaceholderPhoto}
                    alt={username}
                    className="profile__top--img"/>
                    <h1 className='profile__top--header'
                    >{name}</h1>
                </div>
                <div className='profile__middle'>
                    <div className='profile__middle--left'>
                            <div className='profile__middle--left icons'>
                            <Link to={`/discover/${this.state.profile.id}`}>
                                <img className='img'
                                src={PersonSearch}
                                alt="person search"/>
                            </Link>
                            </div>
                        <div className='profile__middle--left icons'>
                        <Link to={`/friendslist/${this.state.profile.id}`}>
                            <img className='img'
                            src={Friend}
                            alt="friend"/>
                        </Link>
                        </div>
                        <div className='profile__middle--left icons'>
                            <img className='edit'
                            src={EditOff}
                            alt="edit off"/>
                        </div>
                        <div className='profile__middle--left icons'>
                            <img className='img'
                            src={Explore}
                            alt="explore"/>
                        </div>
                        {this.state.friendRequests.length?
                            <div className='profile__middle--left icons'>
                                <img src={NotificationTrue} alt="you have notifications" 
                                className='img'/></div> :
                                <div className='profile__middle--left icons'>
                                    <img src={NotificationFalse} alt="you do not have notifications"
                                    className='img'/></div>}
                    </div>
                    <div className='profile__middle--right'>
                        <h3 className='profile__middle--right likes-heading'>
                            Likes
                        </h3>
                        <div className='profile__middle--right likes-div'>
                            {this.state.likes.map((like) => (
                                <p key={like.id} className='profile__middle--right likes'>
                                    {like.likes}
                                </p>
                            ))}
                        </div>
                        <h3 className='profile__middle--right dislikes-heading'>
                            Dislikes
                        </h3>
                        <div className='profile__middle--right dislikes-div'>
                            {this.state.dislikes.map((dislike) => (
                                <p key={dislike.id} className='profile__middle--right dislikes'>
                                    {dislike.dislikes}
                                </p>
                            ))}
                        </div>

                    </div>
                </div>
                <div className='profile__bottom'>
                    <h3 className='profile__bottom--heading'>About</h3>
                    <p className='profile__bottom--about'>{this.state.profile.about}</p>
                </div>    
            </div>
        )
    }
}

export default ProfilePage;