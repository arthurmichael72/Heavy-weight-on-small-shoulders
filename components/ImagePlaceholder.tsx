import React from 'react';
import { ImagePlaceholderProps } from '../types';

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  id, 
  src,
  alt,
  className = "",
  loading = "lazy"
}) => {
  return (
    <div 
      className={`image-container w-full ${className}`} 
      data-image-id={id}
    >
      <img 
        src={src}
        alt={alt}
        loading={loading}
        className="w-full h-auto block"
      />
    </div>
  );
};

export default ImagePlaceholder;