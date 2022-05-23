import { Component } from 'react';
import axios from 'axios';
import './GlobalProfilePage.scss'
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import AddFriend from '../../assets/images/icons/Add_Friend.svg'
import PendingFriend from '../../assets/images/icons/Pending_Friend.svg'
import AcceptedFriend from '../../assets/images/icons/Accepted_Friend.svg'
import Friend from '../../assets/images/icons/friend.svg'
import Back from '../../assets/images/icons/arrow_back.svg'
import { DotPulse } from '@uiball/loaders'
import { Link } from 'react-router-dom';


const API_URL = process.env.REACT_APP_API_URL

class GlobalProfilePage extends Component{

    state = {
        profile: null,
        likes: [],
        dislikes: [],
        friends: [],
        friendRequests: [],
        currentUser: null,
    }

    componentDidMount(){
        const user = this.props.user
        const token = sessionStorage.getItem('token')
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
        axios.get(`${API_URL}/users/${user}/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            this.setState({currentUser: response.data.user})
        })
    }

    handleSendFriendRequest = (event) => {
        let user
        const token = sessionStorage.getItem('token')
        axios.get(`${API_URL}/users/${user}/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            user = response.data.user
            axios.get(`${API_URL}/users/${user}`)
            .then((response) => {
                let profile = response.data
                const friendRequest = {
                    friend_requests: profile.name,
                    user_id: parseInt(event.target.id),
                    profile_id: profile.id
                }
                axios.post(`${API_URL}/users/${this.props.user}/friendrequests`, friendRequest, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })                
            })    
        })
    }

    removeDuplicates = (array) => {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
          if (!newArray.includes(array[i])) {
            newArray.push(array[i]);
          }
        }
        return newArray;
      }
    
    pendingFriendRequests = () => {
        const requests = this.state.friendRequests
        const requestIDs = []
        for (let i=0;i<requests.length;i++){
            requestIDs.push(requests[i].profile_id)
        }
        return this.removeDuplicates(requestIDs)
    }

    acceptedFriendRequests = () => {
        const friends = this.state.friends
        const friendsIDs = []
        for (let i=0;i<friends.length;i++){
            friendsIDs.push(friends[i].profile_id)
        }
        return this.removeDuplicates(friendsIDs)
    }

    handleBack = () => {
        window.history.go(-1)
    }

    componentDidUpdate(){
        const user = this.props.user
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
    const unansweredFriendRequests = this.pendingFriendRequests()
    const approvedFriendRequests = this.acceptedFriendRequests()
        const { name, username, profilePicture, id} = this.state.profile
        return(
            <div className='global'>
                <div className='global__top'>
                    <img src={profilePicture? profilePicture : BlankPlaceholderPhoto}
                    alt={username}
                    className="global__top--img"/>
                    <h1 className='global__top--header'
                    >{name}</h1>
                </div>
                <div className='global__middle'>
                    <div className='global__middle--left'>
                        <div className='global__middle--left icons'>
                            {approvedFriendRequests.includes(this.state.currentUser)? 
                            <img className='friend'
                            id={id}
                            src={AcceptedFriend}
                            alt="accepted friend"/> :
                                unansweredFriendRequests.includes(this.state.currentUser)?
                                <img className='friend'
                                id={id}
                                src={PendingFriend}
                                alt="pending friend"/> :
                                    <img className='img'
                                    id={id}
                                    src={AddFriend}
                                    alt="add friend"
                                    onClick={this.handleSendFriendRequest}/>
                            }
                        </div>
                        <div className='global__middle--left icons'>
                            <Link to={`/friendslist/${this.state.profile.id}`}>
                                <img className='img'
                                src={Friend}
                                alt="friend"/>
                            </Link>
                        </div>
                        <div className='global__middle--left icons'>
                                <img className='img'
                                src={Back}
                                alt="explore"
                                onClick={this.handleBack}/>
                        </div>
                    </div>
                    <div className='global__middle--right'>
                        <h3 className='global__middle--right likes-heading'>
                            Likes
                        </h3>
                        <div className='global__middle--right likes-div'>
                            {this.state.likes.map((like) => (
                                <p key={like.id} className='global__middle--right likes'>
                                    {like.likes}
                                </p>
                            ))}
                        </div>
                        <h3 className='global__middle--right dislikes-heading'>
                            Dislikes
                        </h3>
                        <div className='global__middle--right dislikes-div'>
                            {this.state.dislikes.map((dislike) => (
                                <p key={dislike.id} className='global__middle--right dislikes'>
                                    {dislike.dislikes}
                                </p>
                            ))}
                        </div>

                    </div>
                </div>
                <div className='global__bottom'>
                    <h3 className='global__bottom--heading'>About</h3>
                    <p className='global__bottom--about'>{this.state.profile.about}</p>
                </div>    
            </div>
        )
    }
}

export default GlobalProfilePage;