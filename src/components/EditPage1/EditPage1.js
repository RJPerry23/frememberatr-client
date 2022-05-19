import { Component } from 'react';
import axios from 'axios';
import './EditPage1.scss'
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import EditOn from '../../assets/images/icons/edit_on.svg'
import EditAboutIcon from '../../assets/images/icons/edit_about.svg'
import Add from '../../assets/images/icons/Add.svg'
import Delete from '../../assets/images/icons/Delete.svg'
import Photo from '../../assets/images/icons/Photo.svg'
import { DotPulse } from '@uiball/loaders'
import { Link } from 'react-router-dom';
import EditAbout from '../EditAbout/EditAbout';

const API_URL = process.env.REACT_APP_API_URL

class EditPage1 extends Component{

    state = {
        profile: null,
        likes: [],
        dislikes: [],
        friends: [],
        friendRequests: [],
        isEditAbout: false
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

    handleEditAbout = (event) => {
        event.preventDefault()
        !this.state.isEditAbout ?
        this.setState({isEditAbout: true}) :
        this.setState({isEditAbout: false})
    }

    handleSubmitAbout = (event) => {
        event.preventDefault()
        const user = this.props.user
        if (event.target.aboutInput.value) {
            const newAbout = {
                about: event.target.aboutInput.value
            }
            axios.patch(`${API_URL}/users/${user}`, newAbout)
            .then(
                !this.state.isEditAbout ?
                this.setState({isEditAbout: true}) :
                this.setState({isEditAbout: false})        
            )
        }
    }

    componentDidUpdate(){
        const user = this.props.user
        axios.get(`${API_URL}/users/${user}`)
            .then((response) => {
                this.setState({profile: response.data})
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
        <div>
            <div className='editone'>
                <div className='editone__top'>
                    <Link to={`/profile/${this.state.profile.id}`}>
                    <img src={profilePicture? profilePicture : BlankPlaceholderPhoto}
                    alt={username}
                    className="editone__top--img"/>
                    </Link>
                    <h1 className='editone__top--header'
                    >{name}</h1>
                </div>
                <div className='editone__middle'>
                    <div className='editone__middle--left'>
                        <div className='editone__middle--left icons'>
                            <img className='edit'
                            src={EditOn}
                            alt="edit off"/>
                        </div>
                        <div className='editone__middle--left icons'>
                            <img className='edit'
                            src={Photo}
                            alt="camera"/>
                        </div>
                    </div>
                    <div className='editone__middle--right'>
                        <h3 className='editone__middle--right likes-heading'>
                            <img src={Add} alt='add'/>
                            Likes
                        </h3>
                        <div className='editone__middle--right likes-div'>
                            {this.state.likes.map((like) => (
                                <p key={like.id} className='editone__middle--right likes'>
                                    <img src={Delete} alt='delete' className='icon'/>
                                    {like.likes}
                                </p>
                            ))}
                        </div>
                        <h3 className='editone__middle--right dislikes-heading'>
                            <img src={Add} alt='add'/>
                            Dislikes
                        </h3>
                        <div className='editone__middle--right dislikes-div'>
                            {this.state.dislikes.map((dislike) => (
                                <p key={dislike.id} className='editone__middle--right dislikes'>
                                    <img src={Delete} alt='delete' className='icon'/>
                                    {dislike.dislikes}
                                </p>
                            ))}
                        </div>

                    </div>
                </div>
                <div className='editone__bottom'>
                    <h3 className='editone__bottom--heading'>
                        About
                        <img src={EditAboutIcon}
                        alt='edit about'
                        className='editone__bottom--heading icon'
                        onClick={this.handleEditAbout}/>
                    </h3>
                    <p className='editone__bottom--about'>{this.state.profile.about}</p>
                </div>  
            </div>
            {this.state.isEditAbout?
            <EditAbout 
            user={this.state.profile} 
            handleEditAbout={this.handleEditAbout}
            handleSubmitAbout={this.handleSubmitAbout}/> 
            : null}
        </div>
        )
    }
}

export default EditPage1;