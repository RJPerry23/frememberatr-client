import './EditPageTwoComponent.scss'
import { Component } from 'react';
import axios from 'axios';
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import EditOn from '../../assets/images/icons/edit_on.svg'
import Photo from '../../assets/images/icons/Photo.svg'
import { DotPulse } from '@uiball/loaders'
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL

class EditPage2 extends Component{

    state = {
        profile: null,
        profileImg: "",
        profileImgFile: "",
    }

    componentDidMount(){
        const user = this.props.user
        const token = sessionStorage.getItem('token')
        axios.get(`${API_URL}/users/${user}`)
        .then((response) => {
            this.setState({profile: response.data})
            this.setState({profileImg: response.data.profilePicture})
        })
        axios.get(`${API_URL}/users/${user}/authenticate`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({userAuthenticated: response.data.auth})
        })
    }

    handleImagePreview = (event) => {
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2){
                this.setState({profileImg: reader.result})
            }
        }
        reader.readAsDataURL(event.target.files[0])
        this.setState({profileImgFile: event.target.files[0]})
    }

    handleCancelUpload = () => {
        this.setState({profileImg: this.state.profile.profilePicture})
    }

    handleSubmitUpload = (event) => {
        // event.preventDefault()
        const user = this.props.user
        const token = sessionStorage.getItem('token')
        if (event.target.inputProfileImage.files[0]) {
            const newProfileImagePath = {
                profilePicture: `${API_URL}/images/${event.target.inputProfileImage.files[0].name}`
            }
        const formData = new FormData()
        formData.append('image-field', event.target.inputProfileImage.files[0])
        axios.post(`${API_URL}/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            axios.patch(`${API_URL}/users/${user}`, newProfileImagePath, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(
                axios.get(`${API_URL}/users/${user}`)
                .then((response) => {
                    this.setState({profile: response.data})
                    this.setState({profileImg: response.data.profilePicture})
                })
            )
        )}
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
            <form id='profilePicture' name='profilePicture' 
            onSubmit={this.handleSubmitUpload}>
            <div className='edittwo'>
                <div className='edittwo__top'>
                    <Link to={`/profile/${this.state.profile.id}`}>
                    <img src={profilePicture? profilePicture : BlankPlaceholderPhoto}
                    alt={username}
                    className="edittwo__top--img"/>
                    </Link>
                    <div className='edittwo__top--header'>
                        {name}
                    </div>
                </div>
                <div className='edittwo__middle'>
                    <div className='edittwo__middle--left'>
                        <div className='edittwo__middle--left icons'>
                            <Link to={`/edit1/${this.state.profile.id}`}>
                                <img className='edit'
                                src={EditOn}
                                alt="edit off"/>
                            </Link>
                        </div>
                        <div className='edittwo__middle--left icons'>
                            <img className='edit'
                            src={Photo}
                            alt="camera"/>
                        </div>
                    </div>
                    <div className='edittwo__middle--right'>
                        <h3 className='edittwo__middle--right heading'>
                            Upload A Picture
                        </h3>
                        <div className='edittwo__middle--right img-holder'>
                            <img src={this.state.profileImg? this.state.profileImg :
                                profilePicture? profilePicture : BlankPlaceholderPhoto} 
                            alt='profile' id='profileImage'
                            className='edittwo__middle--right image-preview'/>
                        </div>
                        <input type='file' className='edittwo__middle--right input'
                        id='inputProfileImage' name='inputProfileImage'
                        accept='image/*' onChange={this.handleImagePreview}>
                        </input>
                    </div>
                </div>
                {this.state.profileImg !== profilePicture?
            
                    <div className='edittwo__bottom'>
                        <h3 className='edittwo__bottom--heading'>
                            Submit Photo?
                        </h3>
                            <div className='profile-picture'>
                        <div className='profile-picture__bottom'>
                            <button
                                className='profile-picture__bottom--cancel'
                                onClick={this.handleCancelUpload}>
                                    Cancel
                            </button>
                            <input
                                className='profile-picture__bottom--submit'
                                type='submit'
                                value='Submit'
                                >
                            </input>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
            </form>
        </div>
        )
    }
}

export default EditPage2;