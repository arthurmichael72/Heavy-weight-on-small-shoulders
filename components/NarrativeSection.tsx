import React from 'react';
import { NarrativeProps } from '../types';

const NarrativeSection: React.FC<NarrativeProps> = ({ children, className = "", hasDropCap = false }) => {
  return (
    <div className={`narrative-section max-w-content mx-auto px-6 py-12 md:py-20 text-navy font-sans text-body leading-relaxed ${className} reveal`}>
      <div className={hasDropCap ? "drop-cap" : ""}>
        {children}
      </div>
    </div>
  );
};

export default NarrativeSection;