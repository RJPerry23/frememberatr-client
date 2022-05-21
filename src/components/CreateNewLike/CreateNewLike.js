import './CreateNewLike.scss'
import React, { Component } from 'react';

class CreateNewLike extends Component {

    state = {
        newLikeInput: "",
        errorLikeInput: false,
        user: this.props.user
    }

    componentDidMount() {
        this.setState({user: this.props.user})
    }

    handleChangeLike = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {if (this.state.newLikeInput.length > 0) {
            this.setState({errorLikeInput: false})
        }})
    }

    render() {
        const {
            handleNewLike,
            handleSubmitLike
            } 
             = this.props
        return (
            <form id='create-new-like' name='create-new-like' onSubmit={handleSubmitLike}>
                <div className='create-new-like'>
                    <h3>
                        New Like
                    </h3>
                    <textarea 
                        className='create-new-like__input'
                        name='newLikeInput'
                        id='newLikeInput'
                        placeholder="Write down something you like"
                        onChange={this.handleChangeLike}>
                    </textarea>
                    <div className='create-new-like__bottom'>
                        <button
                            className='create-new-like__bottom--cancel'
                            onClick={handleNewLike}>
                                Cancel
                        </button>
                        <input
                            className='create-new-like__bottom--submit'
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

export default CreateNewLike;