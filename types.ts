import React from 'react';

export interface NarrativeProps {
  children: React.ReactNode;
  className?: string;
  hasDropCap?: boolean;
}

export interface ImagePlaceholderProps {
  id?: string;
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export interface ChartPlaceholderProps {
  id: string;
  label: string;
  description?: string;
}

// GSAP types (basic declaration to satisfy TS if @types/gsap isn't perfectly matched in environment)
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}