import React from 'react';
import { ChartPlaceholderProps } from '../types';

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ id, label, description }) => {
  return (
    <section id={`${id}-section`} className="reveal py-16 px-4">
      <div 
        id={`${id}-wrapper`} 
        className="max-w-[1200px] mx-auto overflow-x-auto min-h-[500px] bg-warm-bg-alt border-2 border-dashed border-navy/30 rounded-lg flex flex-col items-center justify-center gap-4 p-8"
      >
        {description && (
          <div className="text-center mb-4">
             <h2 className="font-sans text-navy font-semibold text-lg md:text-xl mb-2">{label}</h2>
             <p className="text-navy/60 text-sm">{description}</p>
          </div>
        )}
        <span className="text-navy/50 font-medium font-sans uppercase tracking-widest">
          [ {label} ]
        </span>
      </div>
    </section>
  );
};

export default ChartPlaceholder;