import './CreateNewDislike.scss'
import React, { Component } from 'react';

class CreateNewDislike extends Component {

    state = {
        newDislikeInput: "",
        errorDislikeInput: false,
        user: this.props.user
    }

    componentDidMount() {
        this.setState({user: this.props.user})
    }

    handleChangeDislike = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {if (this.state.newDislikeInput.length > 0) {
            this.setState({errorDislikeInput: false})
        }})
    }

    render() {
        const {
            handleNewDislike,
            handleSubmitDislike
            } 
             = this.props
        return (
            <form id='create-new-dislike' name='create-new-dislike' onSubmit={handleSubmitDislike}>
                <div className='create-new-dislike'>
                    <h3>
                        New Dislike
                    </h3>
                    <textarea 
                        className='create-new-dislike__input'
                        name='newDislikeInput'
                        id='newDislikeInput'
                        placeholder="Write down something you dislike"
                        onChange={this.handleChangeDislike}>
                    </textarea>
                    <div className='create-new-dislike__bottom'>
                        <button
                            className='create-new-dislike__bottom--cancel'
                            onClick={handleNewDislike}>
                                Cancel
                        </button>
                        <input
                            className='create-new-dislike__bottom--submit'
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

export default CreateNewDislike;