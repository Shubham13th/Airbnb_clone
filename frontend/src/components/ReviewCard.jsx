import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const ReviewCard = ({ review }) => {
    const { author, date, content, avatar } = review;

    return (
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
                <img
                    src={avatar || "https://a0.muscache.com/defaults/user_pic-50x50.png"}
                    alt={author}
                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                />
                <div>
                    <h3 className="font-semibold text-base text-gray-800">{author}</h3>
                    <p className="text-sm text-gray-500">{date}</p>
                </div>
            </div>
            <div className="text-gray-700 text-sm leading-relaxed">
                {content}
            </div>
        </div>
    );
};

export default ReviewCard;
