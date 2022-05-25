import './EditPageOne.scss'
import React, { Component } from 'react';
import axios from 'axios';
import EditPageOneComponent from '../../components/EditPageOneComponent/EditPageOneComponent'
import ErrorEdit from '../../components/ErrorEdit/ErrorEdit';

const API_URL = process.env.REACT_APP_API_URL

class EditPage extends Component{

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
            this.setState({userAuthenticated: response.data.auth})
        })
    }

    render(){
        return (
            <div>
                {this.state.userAuthenticated?
                    <EditPageOneComponent
                    user={this.props.match.params.user}/> :
                        <ErrorEdit/>}
            </div>
        );    
    }
};

export default EditPage;