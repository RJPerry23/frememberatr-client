import './FriendsPreview.scss'
import React from 'react';
import BlankPlaceholderPhoto from '../../assets/images/Blank3x2.jpg'
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';

function FriendsPreview({friends}) {
    return (
        <div>
            {friends.map((friend) => (
                <Link to={`/profile/${friend.id}`} key={uuid()}
                className='preview'>
                        <div className='preview__left'>
                            <img src={friend.profilePicture? friend.profilePicture : BlankPlaceholderPhoto}
                            alt={friend.username}
                            className='preview__left--img'/>
                        </div>
                        <div className='preview__right'>
                            <h2 className='preview__right--name'>
                                {friend.name}
                            </h2>
                            <p className='preview__right--about'>
                                {friend.about}
                            </p>
                        </div>
                </Link>
            ))}
        </div>
    );
};

export default FriendsPreview;