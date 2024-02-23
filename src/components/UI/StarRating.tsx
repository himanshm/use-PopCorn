const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
};

type StarRatingProps = {
  maxRating: number;
  color: string;
  size: number;
  className: string;
  messages: string[];
  defaultRating: number;
  onSetRating: (rating: number) => void;
};
import { useState } from 'react';
import Star from './Star';

function StarRating({
  maxRating = 5,
  color = '#FCC419',
  size = 48,
  className = '',
  messages = [],
  defaultRating = 0,
  onSetRating,
}: StarRatingProps) {
  const [rating, setRating] = useState<number>(defaultRating);
  const [tempRating, setTempRating] = useState<number>(0);

  function handleRating(rating: number) {
    setRating(rating);
    onSetRating(rating);
  }

  const textStyles = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            isFull={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyles}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
      </p>
    </div>
  );
}

export default StarRating;
