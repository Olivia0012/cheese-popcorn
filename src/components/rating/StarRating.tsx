import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface StarRatingProps {
    initialRating?: number;
    maxRating: number,
    className: string
}

const StarRating: React.FC<StarRatingProps> = ({
    maxRating = 5,
    initialRating = 3,
    className
}) => {
    const [rating, setRating] = useState(initialRating);
    const [tempRating, setTempRating] = useState(initialRating);

    return (
        <div className={className}>
            {Array.from({ length: maxRating }, (el, i) =>
                <div key={`start + ${i}`} onClick={() => setRating(i + 1)} onMouseEnter={() => setTempRating(i + 1)} onMouseLeave={() => setTempRating(rating)}>
                    {((i + 1) <= tempRating) && <AiFillStar />}
                    {((i + 1) > tempRating) && <AiOutlineStar />}
                </div>
            )}
            <div style={{ marginTop: '-4px', marginLeft: '10px', width: '10px' }}><p>{tempRating}</p></div>
        </div>
    )
}

export default StarRating
