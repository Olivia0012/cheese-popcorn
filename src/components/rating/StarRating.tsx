import React, { Dispatch, SetStateAction, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface StarRatingProps {
    initialRating?: number;
    maxRating: number;
    className: string;
    rating: number;
    setRating: Dispatch<SetStateAction<number>>;
}

const StarRating: React.FC<StarRatingProps> = ({
    maxRating = 5,
    initialRating = 0,
    className,
    rating,
    setRating
}) => {
    const [tempRating, setTempRating] = useState(initialRating);

    return (
        <div className={className}>
            {Array.from({ length: maxRating }, (el, i) =>
                <div
                    key={`start + ${i}`}
                    onClick={() => initialRating === 0 && setRating(i + 1)}
                    onMouseEnter={() => initialRating === 0 && setTempRating(i + 1)}
                    onMouseLeave={() => initialRating === 0 && setTempRating(rating)}
                >
                    {((i + 1) <= tempRating) && <AiFillStar />}
                    {((i + 1) > tempRating) && <AiOutlineStar />}
                </div>
            )}
            <div style={{ marginTop: '-4px', marginLeft: '10px', width: '10px' }}><p>{tempRating}</p></div>
        </div>
    )
}

export default StarRating
