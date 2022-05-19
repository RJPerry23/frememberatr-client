import './ProfilePage.scss'
import React, { Component } from 'react';
import GlobalProfilePage from '../GlobalProfilePage/GlobalProfilePage';
import PersonalProfilePage from '../PersonalProfilePage/PersonalProfilePage';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

class ProfilePage extends Component{

    state = {
        userAuthenticated: false
    }

    componentDidMount(){
        const user = this.props.match.params.user
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
            this.setState({userAuthenticated: response.data})
        })
    }

    render(){
        return (
            <div>
                {this.state.userAuthenticated?
                    <PersonalProfilePage
                    user={this.props.match.params.user}/> :
                        <GlobalProfilePage
                        user={this.props.match.params.user}/>}
            </div>
        );    
    }
};

export default ProfilePage;