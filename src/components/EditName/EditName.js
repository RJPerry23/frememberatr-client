import './EditName.scss'
import React, { Component } from 'react';

class EditName extends Component {

    state = {
        nameInput: "",
        errorNameInput: false,
        user: this.props.user
    }

    componentDidMount() {
        this.setState({user: this.props.user})
        this.setState({nameInput: this.props.user.name})
    }

    handleChangeName = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {if (this.state.nameInput.length > 0) {
            this.setState({errorNameInput: false})
        }})
    }

    render() {
        const {
            handleEditName,
            handleSubmitName
            } 
             = this.props
        return (
            <form id='editname' name='editname' onSubmit={handleSubmitName}>
                <div className='editname'>
                    <h3>
                        Name
                    </h3>
                    <textarea 
                        className='editname__input'
                        name='nameInput'
                        id='nameInput'
                        value={this.state.nameInput}
                        onChange={this.handleChangeName}>
                    </textarea>
                    <div className='editname__bottom'>
                        <button
                            className='editname__bottom--cancel'
                            onClick={handleEditName}>
                                Cancel
                        </button>
                        <input
                            className='editname__bottom--submit'
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

export default EditName;