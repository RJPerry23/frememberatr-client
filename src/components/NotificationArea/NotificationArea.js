import './NotificationArea.scss'
import Notification from '../Notification/Notification'
import uuid from 'react-uuid';
import React from 'react';

const NotificationArea = ({user, updatePage}) => {
    return (
        <div className='notification-area'>
            <Notification
                key={uuid()}
                user={user}
                updatePage={updatePage}
            />
        </div>
    );
};

export default NotificationArea;