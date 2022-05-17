import './ProfilePreview.scss'
import React from 'react';
import uuid from 'react-uuid';
// import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'

function ProfilePreview ({newfriends}) {
    return (
        <div>
            {newfriends.map((newfriend) => (
                <div key={uuid()}>
                    <h2>{newfriend.name}</h2>
                    <p>{newfriend.about}</p>
                </div>
            ))}
        </div>
    );
};

export default ProfilePreview;