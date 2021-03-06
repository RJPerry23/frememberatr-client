import { Component } from 'react';
import axios from 'axios';
import './PersonalProfilePage.scss'
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import PersonSearch from '../../assets/images/icons/person_search.svg'
import Friend from '../../assets/images/icons/friend.svg'
import EditOff from '../../assets/images/icons/edit_off.svg'
import Logout from '../../assets/images/icons/logout.svg'
import NotificationTrue from '../../assets/images/icons/notification_true.svg'
import NotificationFalse from '../../assets/images/icons/notification_false.svg'
import ConfirmLogout from '../ConfirmLogout/ConfirmLogout'
import { DotPulse } from '@uiball/loaders'
import { Link } from 'react-router-dom';


const API_URL = process.env.REACT_APP_API_URL

class PersonalProfilePage extends Component{

    state = {
        profile: null,
        likes: [],
        dislikes: [],
        friends: [],
        friendRequests: [],
        requestLogout: false
    }

    componentDidMount(){
        const user = this.props.user
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

    handleRequestLogout = (event) => {
        event.preventDefault()
        !this.state.requestLogout ?
        this.setState({requestLogout: true}) :
        this.setState({requestLogout: false})
    }

    handleSubmitLogout = (event) => {
        event.preventDefault()
        sessionStorage.removeItem('token')
        window.location='/'
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
                        <Link to={`/edit1/${this.state.profile.id}`}>
                            <img className='edit'
                            src={EditOff}
                            alt="edit off"/>
                        </Link>
                        </div>
                        {this.state.friendRequests.length?
                            <div className='profile__middle--left icons'>

                                <Link to={`/notifications/${this.state.profile.id}`}>
                                <img src={NotificationTrue} alt="you have notifications" 
                                className='img'/>
                                </Link>
                                </div> :

                                <div className='profile__middle--left icons'>
                                    <Link to={`/notifications/${this.state.profile.id}`}>
                                    <img src={NotificationFalse} alt="you do not have notifications"
                                    className='img'/>
                                    </Link>
                                    </div>}
                        <div className='profile__middle--left icons'>
                            <img className='request-logout'
                            src={Logout}
                            alt="logout"
                            onClick={this.handleRequestLogout}/>
                        </div>
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
                {this.state.requestLogout?
                <ConfirmLogout
                user={this.state.profile} 
                handleRequestLogout={this.handleRequestLogout}
                handleSubmitLogout={this.handleSubmitLogout}/> 
                : null}    
            </div>
        )
    }
}

export default PersonalProfilePage;