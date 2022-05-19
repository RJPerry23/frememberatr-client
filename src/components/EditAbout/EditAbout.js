import './EditAbout.scss'
import React, { Component } from 'react';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL

class EditAbout extends Component {

    state = {
        aboutInput: "",
        errorAboutInput: false,
        user: this.props.user
    }

    componentDidMount() {
        this.setState({user: this.props.user})
    }

    handleChangeAbout = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {if (this.state.aboutInput.length > 0) {
            this.setState({errorAboutInput: false})
        }})
    }

    render() {
        const {
            handleEditAbout,
            handleSubmitAbout
            } 
             = this.props
        return (
            <form id='editabout' name='editabout' onSubmit={handleSubmitAbout}>
                <div className='editabout'>
                    <h3>
                        About
                    </h3>
                    <textarea 
                        className='editabout__input'
                        name='aboutInput'
                        id='aboutInput'
                        placeholder={this.state.user.about}
                        onChange={this.handleChangeAbout}>
                    </textarea>
                    <div className='editabout__bottom'>
                        <button
                            className='editabout__bottom--cancel'
                            onClick={handleEditAbout}>
                                Cancel
                        </button>
                        <input
                            className='editabout__bottom--submit'
                            type='submit'
                            value='Submit'
                            // onClick={handleSubmitAbout}
                            >
                        </input>
                    </div>
                </div>
            </form>
        );        
    }
};

export default EditAbout;