import './EditAbout.scss'
import React, { Component } from 'react';

class EditAbout extends Component {

    state = {
        aboutInput: "",
        errorAboutInput: false,
        user: this.props.user
    }

    componentDidMount() {
        this.setState({user: this.props.user})
        this.setState({aboutInput: this.props.user.about})
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
                        value={this.state.aboutInput}
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
                            >
                        </input>
                    </div>
                </div>
            </form>
        );        
    }
};

export default EditAbout;