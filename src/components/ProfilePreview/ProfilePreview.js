import './ProfilePreview.scss'
import React from 'react';
import uuid from 'react-uuid';
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import { Link } from 'react-router-dom';

function ProfilePreview ({newfriends}) {
    return (
        <div>
            {newfriends.map((newfriend) => (
                    <Link to={`/profile/${newfriend.id}`} key={uuid()}
                    className='preview'>
                            <div className='preview__left'>
                                <img src={newfriend.profilePicture? newfriend.profilePicture : BlankPlaceholderPhoto}
                                alt={newfriend.username}
                                className='preview__left--img'/>
                            </div>
                            <div className='preview__right'>
                                <h2 className='preview__right--name'>
                                    {newfriend.name}
                                </h2>
                                <p className='preview__right--about'>
                                    {newfriend.about}
                                </p>
                            </div>
                    </Link>
            ))}
        </div>
    );
};

export default ProfilePreview;