import React, { useState } from 'react';
import { StarIcon } from './Icons';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  className?: string;
  size?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, className, size = 'h-5 w-5' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className={`flex items-center ${className || ''}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const currentRating = onRatingChange ? hoverRating || rating : rating;
        const isFilled = star <= currentRating;
        
        return (
          <button
            key={star}
            type="button"
            disabled={!onRatingChange}
            onClick={onRatingChange ? () => onRatingChange(star) : undefined}
            onMouseEnter={onRatingChange ? () => setHoverRating(star) : undefined}
            onMouseLeave={onRatingChange ? () => setHoverRating(0) : undefined}
            className={`text-yellow-400 focus:outline-none focus:ring-0 ${onRatingChange ? 'cursor-pointer' : ''}`}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <StarIcon className={size} filled={isFilled} />
          </button>
        );
      })}
    </div>
  );
};