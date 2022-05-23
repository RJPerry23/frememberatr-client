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
    }

    componentDidMount(){
        const user = this.props.user
        const token = sessionStorage.getItem('token')
        axios.get(`${API_URL}/users/${user}`)
        .then((response) => {
            this.setState({profile: response.data})
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
                        <h3 className='edittwo__middle--right likes-heading'>
                            Upload A Picture
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default EditPage2;