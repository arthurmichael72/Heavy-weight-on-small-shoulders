import React, { useLayoutEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Cloud Layer Refs
  const cloudLayerRef = useRef<HTMLDivElement>(null);
  const cloud1Ref = useRef<HTMLImageElement>(null);
  const cloud2Ref = useRef<HTMLImageElement>(null);
  const cloud3Ref = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Salima Layer Refs
  const salimaImageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = window.gsap.context(() => {
      // MASTER TIMELINE linked to scroll
      // The scroll distance is determined by the height of the container (300vh) 
      // relative to the viewport.
      
      const tl = window.gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth scrub
        }
      });

      // 1. Cloud Curtain Lifting (The Reveal)
      // Speed up relative to total: finish by t=6 (60%)
      // This ensures clouds are fully gone and the user can enjoy the full image 
      // for the remaining 40% of the scroll section.
      tl.to(cloudLayerRef.current, {
        y: '-100%',
        ease: 'none',
        duration: 6
      }, 0); 

      // 2. Internal Parallax for Clouds 
      // Match duration of lifting
      tl.to(cloud1Ref.current, { y: '20%', ease: 'none', duration: 6 }, 0);
      tl.to(cloud2Ref.current, { y: '10%', ease: 'none', duration: 6 }, 0);
      tl.to(cloud3Ref.current, { y: '5%', ease: 'none', duration: 6 }, 0);

      // 3. Title Fade Out
      // Fades out quickly as scrolling starts
      tl.to(titleRef.current, {
        opacity: 0,
        y: -100,
        scale: 0.9,
        duration: 2,
        ease: 'power1.in'
      }, 0);

      // 4. Salima Image Scale
      // Continues through the hold phase for liveliness
      window.gsap.set(salimaImageRef.current, { scale: 1.2 });
      tl.to(salimaImageRef.current, {
        scale: 1,
        duration: 10, // Continues until the very end
        ease: 'none'
      }, 0);

      // 5. Text Overlay Reveal
      // Starts as clouds are clearing (t=4.5), fully visible by t=6.5
      tl.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 2,
        ease: 'power2.out'
      }, 4.5);

      // Scroll cue fade out
      window.gsap.to('.scroll-cue', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0% top',
          end: '10% top',
          scrub: true
        },
        opacity: 0
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="hero relative h-[300vh] w-full bg-warm-bg">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden block">
        
        {/* === LAYER 1: SALIMA (Bottom / Revealed) === */}
        <div className="absolute inset-0 z-0 bg-warm-bg flex items-center justify-center overflow-hidden">
           <img 
             ref={salimaImageRef}
             src="https://lh3.googleusercontent.com/pw/AP1GczPKEBhbIto3nx5k0qT_YGdQ6AYyBg0DcIxOWJa4UofgT-yyBxn5Ech4PgQsfiUChvRtRdKtMfH9cBGuP_JKQyU0HZ4y7t387Bns5GtqknanmlwyHqB46EsDvcvJS2qf4FeUbE3QShFDjTO0ZFli9nah=w1024-h1024-s-no-gm?authuser=0"
             alt="Salima watching clouds gather over the savannah"
             className="w-full h-full object-cover"
             loading="eager"
           />
           {/* Text Overlay */}
           <div 
             ref={textRef}
             className="hero-text-overlay absolute z-10 bottom-12 left-6 right-6 md:left-auto md:right-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:max-w-[350px] bg-navy/90 p-6 md:p-8 backdrop-blur-md text-text-light shadow-xl rounded-sm"
           >
             <p className="font-sans text-body font-normal leading-relaxed">
               Salima watches the clouds gather on the horizon and smiles. The rains are coming, harvest season at last. But as quickly as joy crosses her face, a shadow follows. In West Mamprusi, the rains bring life to the crops, but they also bring death to the children.
             </p>
           </div>
        </div>

        {/* === LAYER 2: CLOUDS + TITLE (Top / Curtain) === */}
        <div 
          ref={cloudLayerRef}
          className="absolute inset-0 z-20 bg-warm-bg overflow-hidden"
        >
          {/* Main Title */}
          <div ref={titleRef} className="absolute inset-0 z-50 flex items-center justify-center px-4">
              <div className="text-center relative">
                  <div className="w-24 h-[2px] bg-navy/60 mx-auto mb-6 md:mb-8"></div>
                  <h1 className="font-sans font-bold text-hero-title text-navy leading-tight max-w-5xl drop-shadow-xl">
                      Heavy Weight on<br />Small Shoulders
                  </h1>
                  <div className="w-24 h-[2px] bg-navy/60 mx-auto mt-6 md:mt-8"></div>
              </div>
          </div>

          {/* Cloud Images (Parallaxed inside the lifting layer) */}
          <div className="absolute inset-0 z-20">
            <img 
              ref={cloud3Ref}
              src="https://lh3.googleusercontent.com/pw/AP1GczMNQA3-nUUO_hqkmwlZJ9jmQZuQGNtJpuSfcD-W_nEfe3uMKzAP9YC45zTcQGhLm6DNwhj8vCKZ7V77oBOsZ9VppIjiN9XwbKM0Q2E_vM7pJ76c7I1zwiQSVXUqs4KOARAlFeqlVF3r4RnwxKeIeNKa=w1920-h1080-s-no-gm?authuser=0" 
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-90 scale-110 origin-bottom" 
            />
          </div>
          <div className="absolute inset-0 z-30">
             <img 
               ref={cloud2Ref}
               src="https://lh3.googleusercontent.com/pw/AP1GczMNQA3-nUUO_hqkmwlZJ9jmQZuQGNtJpuSfcD-W_nEfe3uMKzAP9YC45zTcQGhLm6DNwhj8vCKZ7V77oBOsZ9VppIjiN9XwbKM0Q2E_vM7pJ76c7I1zwiQSVXUqs4KOARAlFeqlVF3r4RnwxKeIeNKa=w1920-h1080-s-no-gm?authuser=0" 
               alt=""
               className="absolute inset-0 w-full h-full object-cover opacity-80 scale-125 origin-bottom-right" 
             />
          </div>
          <div className="absolute inset-0 z-40">
             <img 
               ref={cloud1Ref}
               src="https://lh3.googleusercontent.com/pw/AP1GczMNQA3-nUUO_hqkmwlZJ9jmQZuQGNtJpuSfcD-W_nEfe3uMKzAP9YC45zTcQGhLm6DNwhj8vCKZ7V77oBOsZ9VppIjiN9XwbKM0Q2E_vM7pJ76c7I1zwiQSVXUqs4KOARAlFeqlVF3r4RnwxKeIeNKa=w1920-h1080-s-no-gm?authuser=0" 
               alt=""
               className="absolute inset-0 w-full h-full object-cover opacity-95 scale-150 origin-bottom-left" 
             />
          </div>
          
          {/* Scroll Cue attached to cloud layer */}
          <div className="scroll-cue absolute bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 z-50 text-navy/80 md:text-navy/60 uppercase tracking-[0.2em] text-sm animate-bounce font-medium">
            Scroll to Begin
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;