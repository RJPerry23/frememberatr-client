import './ConfirmLogout.scss'
import React, { Component } from 'react';

class EditName extends Component {

    state = {
        user: this.props.user
    }

    componentDidMount() {
        this.setState({user: this.props.user})
    }

    render() {
        const {
            handleRequestLogout,
            handleSubmitLogout
            } 
             = this.props

        return (
            <form id='logout' name='logout' onSubmit={handleSubmitLogout}>
                <div className='logout'>
                    <h3>
                        Logout?
                    </h3>
                    <div className='logout__bottom'>
                        <button
                            className='logout__bottom--cancel'
                            onClick={handleRequestLogout}>
                                Cancel
                        </button>
                        <input
                            className='logout__bottom--submit'
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