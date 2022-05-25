import { Component } from 'react';
import axios from 'axios';
import './EditPageOneComponent.scss'
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import EditOn from '../../assets/images/icons/edit_on.svg'
import EditAboutIcon from '../../assets/images/icons/edit_about.svg'
import EditNameIcon from '../../assets/images/icons/edit_name.svg'
import Add from '../../assets/images/icons/Add.svg'
import Delete from '../../assets/images/icons/Delete.svg'
import Photo from '../../assets/images/icons/Photo.svg'
import { DotPulse } from '@uiball/loaders'
import { Link } from 'react-router-dom';
import EditName from '../EditName/EditName';
import EditAbout from '../EditAbout/EditAbout';
import CreateNewLike from '../CreateNewLike/CreateNewLike';
import CreateNewDislike from '../CreateNewDislike/CreateNewDislike';

const API_URL = process.env.REACT_APP_API_URL

class EditPage1 extends Component{

    state = {
        profile: null,
        likes: [],
        dislikes: [],
        isEditName: false,
        isEditAbout: false,
        isNewLike: false,
        isNewDislike: false,
        redirectEditTwo: false
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
        const token = sessionStorage.getItem('token')
        if(!token){
            return this.setState({userAuthenticated: false})
        }
        axios.get(`${API_URL}/users/${user}/authenticate`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({userAuthenticated: response.data.auth})
        })
    }

    handleEditName = (event) => {
        event.preventDefault()
        !this.state.isEditName ?
        this.setState({isEditName: true}) :
        this.setState({isEditName: false})
    }

    handleSubmitName = (event) => {
        event.preventDefault()
        const user = this.props.user
        const token = sessionStorage.getItem('token')
        if (event.target.nameInput.value) {
            const newName = {
                name: event.target.nameInput.value
            }
            axios.patch(`${API_URL}/users/${user}`, newName, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(
                !this.state.isEditName ?
                this.setState({isEditName: true}) :
                this.setState({isEditName: false})        
            )
        }
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
        const token = sessionStorage.getItem('token')
        if (event.target.aboutInput.value) {
            const newAbout = {
                about: event.target.aboutInput.value
            }
            axios.patch(`${API_URL}/users/${user}`, newAbout, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(
                !this.state.isEditAbout ?
                this.setState({isEditAbout: true}) :
                this.setState({isEditAbout: false})        
            )
        }
    }

    handleNewLike = (event) => {
        event.preventDefault()
        !this.state.isNewLike ?
        this.setState({isNewLike: true}) :
        this.setState({isNewLike: false})
    }

    handleSubmitLike = (event) => {
        event.preventDefault()
        const user = this.props.user
        const token = sessionStorage.getItem('token')
        if (event.target.newLikeInput.value) {
            const newLike = {
                likes: event.target.newLikeInput.value,
                user_id: user
            }
            axios.post(`${API_URL}/users/${user}/likes`, newLike, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(
                !this.state.isNewLike ?
                this.setState({isNewLike: true}) :
                this.setState({isNewLike: false})        
            )
        }
    }

    handleNewDislike = (event) => {
        event.preventDefault()
        !this.state.isNewDislike ?
        this.setState({isNewDislike: true}) :
        this.setState({isNewDislike: false})
    }

    handleSubmitDislike = (event) => {
        event.preventDefault()
        const user = this.props.user
        const token = sessionStorage.getItem('token')
        if (event.target.newDislikeInput.value) {
            const newDislike = {
                dislikes: event.target.newDislikeInput.value,
                user_id: user
            }
            axios.post(`${API_URL}/users/${user}/dislikes`, newDislike, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(
                !this.state.isNewDislike ?
                this.setState({isNewDislike: true}) :
                this.setState({isNewDislike: false})        
            )
        }
    }

    handleDeleteLike = (event) => {
        const user = this.props.user
        const token = sessionStorage.getItem('token')
        axios.delete(`${API_URL}/users/${user}/likes/${event.target.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    handleDeleteDislike = (event) => {
        const user = this.props.user
        const token = sessionStorage.getItem('token')
        axios.delete(`${API_URL}/users/${user}/dislikes/${event.target.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    componentDidUpdate(){
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
                    <div className='editone__top--header'>
                        {name}
                        <img src={EditNameIcon} 
                        alt='edit name'
                        className='editone__top--header--edit'
                        onClick={this.handleEditName}/>
                    </div>
                </div>
                <div className='editone__middle'>
                    <div className='editone__middle--left'>
                        <div className='editone__middle--left icons'>
                            <Link to={`/profile/${this.state.profile.id}`}>
                                <img className='edit'
                                src={EditOn}
                                alt="edit off"/>
                            </Link>
                        </div>
                        <div className='editone__middle--left icons'>
                            <Link to={`/edit2/${this.state.profile.id}`}>
                                <img className='edit'
                                src={Photo}
                                alt="camera"
                                onClick={this.redirectEditTwo}/>
                            </Link>
                        </div>
                    </div>
                    <div className='editone__middle--right'>
                        <h3 className='editone__middle--right likes-heading'>
                            <img src={Add} alt='add'
                            className='editone__middle--right add-icon'
                            onClick={this.handleNewLike}/>
                            Likes
                        </h3>
                        <div className='editone__middle--right likes-div'>
                            {this.state.likes.map((like) => (
                                <div key={like.id}
                                    className='editone__middle--right likes'>
                                    <img src={Delete} 
                                    alt='delete' 
                                    className='icon'
                                    id={like.id}
                                    onClick={this.handleDeleteLike}/>
                                    {like.likes}
                                </div>
                            ))}
                        </div>
                        <h3 className='editone__middle--right dislikes-heading'>
                            <img src={Add} alt='add'
                            className='editone__middle--right add-icon'
                            onClick={this.handleNewDislike}/>
                            Dislikes
                        </h3>
                        <div className='editone__middle--right dislikes-div'>
                            {this.state.dislikes.map((dislike) => (
                                <p key={dislike.id}
                                    className='editone__middle--right dislikes'>
                                    <img src={Delete}
                                    alt='delete'
                                    className='icon'
                                    id={dislike.id}
                                    onClick={this.handleDeleteDislike}/>
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
            {this.state.isEditName?
            <EditName 
            user={this.state.profile} 
            handleEditName={this.handleEditName}
            handleSubmitName={this.handleSubmitName}/> 
            : null}
            {this.state.isEditAbout?
            <EditAbout 
            user={this.state.profile} 
            handleEditAbout={this.handleEditAbout}
            handleSubmitAbout={this.handleSubmitAbout}/> 
            : null}
            {this.state.isNewLike?
            <CreateNewLike 
            user={this.state.profile} 
            handleNewLike={this.handleNewLike}
            handleSubmitLike={this.handleSubmitLike}/> 
            : null}
            {this.state.isNewDislike?
            <CreateNewDislike 
            user={this.state.profile} 
            handleNewDislike={this.handleNewDislike}
            handleSubmitDislike={this.handleSubmitDislike}/> 
            : null}
        </div>
        )
    }
}

export default EditPage1;