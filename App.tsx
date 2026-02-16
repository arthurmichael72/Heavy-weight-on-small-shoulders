import React, { useLayoutEffect, useRef } from 'react';
import Hero from './components/Hero';
import NarrativeSection from './components/NarrativeSection';
import ImagePlaceholder from './components/ImagePlaceholder';
import IsotypeGrid from './components/IsotypeGrid';
import PictorialChart from './components/PictorialChart';
import PopulationChart from './components/PopulationChart';

const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Register ScrollTrigger if available globally
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
    
    // Ensure fonts are loaded before calculating triggers
    document.fonts.ready.then(() => {
        window.ScrollTrigger.refresh();
    });
    
    const ctx = window.gsap.context(() => {
      // Global Reveal Animation
      const elements = window.gsap.utils.toArray('.reveal');
      elements.forEach((el: any) => {
        window.gsap.from(el, {
          scrollTrigger: { 
            trigger: el, 
            start: 'top 85%', // Slightly earlier start for better feel
            toggleActions: 'play none none none' 
          },
          opacity: 0, 
          y: 60, 
          duration: 0.8, 
          ease: 'power2.out'
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full min-h-screen overflow-x-hidden">
      
      {/* SECTION 1: HERO (includes Title) */}
      <Hero />

      {/* SECTION 2: INTRODUCTION */}
      <NarrativeSection hasDropCap>
        <p>
          West Mamprusi District lies in Ghana's North East Region, a land of sprawling compounds, bustling markets, and vast shea nut groves. Here, life moves with the seasons. When the rains arrive between May and October, mothers like Salima spend time on their groundnut fields to harvest the earth's gifts. But this is also the season when mosquitoes breed in every puddle, and every water pot.
        </p>
      </NarrativeSection>

      {/* SECTION 3: ISOTYPE GRID */}
      <section id="isotype-section" className="reveal py-12 md:py-20 px-4 bg-warm-bg-alt/50">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="font-sans text-xl md:text-2xl text-navy mb-4 font-semibold px-4">
            Average Malaria monthly admissions and deaths during the rainy season
          </h2>
          <p className="text-navy/60 text-sm mb-10 italic">
            Hover or tap on any figure to see what it represents
          </p>
          
          <IsotypeGrid />
          
        </div>
      </section>

      {/* SECTION 3B: POPULATION NARRATIVE & CHART */}
      <NarrativeSection>
        <p>
          Despite Ghana's meaningful strides in the fight against malaria, the disease remains endemic. According to the 2024 World Malaria Report, Ghana recorded 6.55 million cases in 2023 alone. With Ghana's national population estimated at 35.7 million in 2026, 6.55 million cases represent nearly 20% of the entire country. This is the equivalent of one out of every five people you meet across Ghana being affected. That was the nation's burden. In West Mamprusi, the weight fell heaviest on the smallest shoulders.
        </p>
      </NarrativeSection>

      <section className="reveal py-12 px-4">
        <div className="max-w-[1000px] mx-auto bg-warm-bg-alt/50 p-6 rounded-lg border border-navy/10">
           <PopulationChart />
        </div>
      </section>

      <NarrativeSection>
        <p className="mb-6">
          Salima is a mother of two who rises before dawn to fetch water and tends her groundnut farm until dusk. Her hands know the rhythm of planting and harvesting, but her heart knows a different rhythm, the frantic beating when her child's forehead burns with fever.
        </p>
        <p>
          Community Health Volunteers walk the dusty paths between compounds, carrying medicine and hope in equal measure. They know every family, every child, every compound gate.
        </p>
      </NarrativeSection>

      {/* SECTION 4: WATERCOLOR CHV */}
      <section className="watercolor-section reveal px-4 md:px-0 max-w-[1400px] mx-auto mb-4">
        <ImagePlaceholder 
          id="chv-walking" 
          src="https://lh3.googleusercontent.com/pw/AP1GczOA890NOIkIUiSHRC3HK37NIdamv0-rekfS60GAAYTRVgOt8rAG9zFlLDuYZV4AwtS6h8IEMMxTbYoY8RdvtWFPibRW39S9598PVQJyz6RLhCuMsRW2gbqv1I4Wyabtnk3BCMrRwDKccctVLblwlrk4=w1024-h684-s-no-gm?authuser=0"
          alt="Community Health Volunteer walking through a West Mamprusi village"
        />
        <p className="text-center font-sans italic text-caption text-navy/70 mt-4">
          A Community Health Volunteer makes her rounds.
        </p>
      </section>

      <NarrativeSection>
        <p>
          Children like Ali fill the playgrounds with laughter when they are well. They chase guinea fowl through the yards and help their mothers carry water from the borehole. When malaria strikes, the playgrounds fall silent.
        </p>
      </NarrativeSection>

      {/* SECTION 5: WATERCOLOR PLAYGROUND */}
      <section className="reveal px-4 md:px-0 max-w-[1400px] mx-auto mt-20 mb-4">
        <ImagePlaceholder 
          id="village-playground" 
          src="https://lh3.googleusercontent.com/pw/AP1GczNh0pQ4zlU6iRLZlUP60PSvFLEo8_9_VLcFgCh9Vx5TvuD1bUznQDuZG5U7_jkjiHMDzxi4Pj894-T5r7j-BKlOLVEslstBzBcTeRJmQVFdRd11j8J0ok74TYziiWgCSK7ccmxX_H-P5sdiZYjQUwaN=w1024-h1024-s-no-gm?authuser=0"
          alt="Village playground — tire swing, swings, merry-go-round, sandy ground"
        />
        <p className="text-center font-sans italic text-caption text-navy/70 mt-4">
          Silence where there should be play.
        </p>
      </section>

      <NarrativeSection>
        <p>
          In 2015, the hospitals across West Mamprusi recorded <strong className="text-crimson font-bold">214,118</strong> admissions of children under five battling with malaria. That can be compared to 892 primary school classrooms in the North East Region filled with sick children.
        </p>
      </NarrativeSection>

      {/* SECTION 6: STADIUM ILLUSTRATION (Full Bleed) */}
      <section className="reveal mt-24 mb-16">
        <div className="text-center mb-8 px-4">
          <h2 className="font-sans font-semibold text-xl md:text-2xl text-crimson">
            Enough to Fill Tamale Stadium — Ten Times Over
          </h2>
        </div>
        <div className="full-bleed-image relative w-screen relative left-1/2 -ml-[50vw]">
          <img 
            src="https://lh3.googleusercontent.com/pw/AP1GczMyc232UV1c7l37x-RAydU2Pw9IzhpXcFmHEu32R-O5ZkZId28Pd_fO1gdGyyAjTN-pQxA31HfAFBDDbY7cTcJVCEsGtQSPC7MJhw6tX73mwptaYycfPyesJv0SyQvNWV3Pu66DaqMtXod8GjwvHG0E=w1024-h1024-s-no-gm?authuser=0"
            alt="Illustration of ten stadiums arranged together showing the scale of illness"
            className="w-full h-auto block"
            data-image-id="ten-stadiums"
            loading="lazy"
          />
        </div>
      </section>

      {/* SECTION 7: NARRATIVE */}
      <NarrativeSection>
        <p className="mb-6">
          Compounds that should have echoed with the laughter of playing children instead fell quiet with worry. Community playgrounds stood empty, swings occupied only by dust carried on the breeze. A mother might carry her child to the hospital three, four, five times in a single rainy season. Each journey was a day lost from the farm. Each treatment was a dent in the family's meager savings. Each sleepless night of anxious vigil was a piece of a mother's heart worn away.
        </p>
        <p>
          By 2019, the district still recorded over 165,608 under-five admissions. The numbers were staggering, and behind every number was a child, a mother, a family caught in malaria's grip.
        </p>
      </NarrativeSection>

      {/* SECTION 8: ADMISSIONS CHART */}
      <section id="admissions-chart-section" className="reveal py-16 px-4 bg-white/40">
        <div className="max-w-[1400px] mx-auto">
          <PictorialChart mode="admissions" />
        </div>
      </section>

      {/* SECTION 8B: NARRATIVE CHANGE */}
      <NarrativeSection>
        <p className="mb-6">
          The situation seemed insurmountable. Climate patterns were shifting, making rainy seasons less predictable but no less deadly. The population was growing, but health infrastructure struggled to keep pace. Mothers like Salima lived in perpetual anxiety, watching the clouds gather each year and knowing what followed the rain.
        </p>
        <p className="mb-6">
          The cycle repeated: rains came, mosquitoes bred, children fell ill, mothers rushed to hospitals, harvests went ungathered, families grew poorer, and the next rainy season arrived to begin the pattern again.
        </p>
        <p className="font-semibold text-crimson text-xl mt-8">
          Something had to change.
        </p>
      </NarrativeSection>

      {/* SECTION 9: WATERCOLOR COMPOUND */}
      <section className="reveal px-4 md:px-0 max-w-[1400px] mx-auto mt-12 mb-12">
        <ImagePlaceholder 
          id="village-compound" 
          src="https://lh3.googleusercontent.com/pw/AP1GczN78oiwdQcw0Yryw1VMfiQFQPi_Cmgw72WgXR-2pD_wn4i8zvPlN2CIUJgb0630GsKan44rsihku8pws0eYMqcu8euR2COcwAx39aF34IOtSWG58zOYssX7pnoIfXl-GzH6KJNDskVnL0eW35tnpbul=w1024-h1024-s-no-gm?authuser=0"
          alt="Traditional village compound with round mud buildings and warm ochre tones"
        />
      </section>

      {/* SECTION 9B: NARRATIVE SHIELD */}
      <NarrativeSection>
        <p className="mb-6">
          In the mid-1700s, King NaJeringa of the Mamprusi built a wall that stood eleven feet high and stretched for twenty-five kilometers. The <em>Birnigoomni</em>, as it was locally named, protected his people from slave raiders. It was a barrier between danger and the community, a shield of defence built on determination and care. In 2020, a new shield arrived in West Mamprusi.
        </p>
        <p className="mb-6">
          Seasonal Malaria Chemoprevention (SMC) came to the district like the <em>Birnigoomni</em> of old. But instead of mud and stone, this wall was built with medicine and dedication. Community Health Volunteers became its builders, walking from compound to compound during the rainy months, placing preventive tablets in the mouths of children before the mosquitoes could strike.
        </p>
        <p className="font-semibold text-lg mb-4">The change was swift.</p>
        <p>
          Hospital admissions dropped to <strong className="text-teal font-bold">122,553</strong> in the first year of SMC implementation. By 2024, they had fallen to <strong className="text-teal font-bold">110,260</strong>.
        </p>
      </NarrativeSection>

      {/* SECTION 10: COMPARISON CHART */}
      <section id="comparison-chart-section" className="reveal py-16 px-4 bg-white/40">
        <div className="max-w-[1400px] mx-auto">
          <PictorialChart mode="comparison" />
        </div>
      </section>

      {/* SECTION 11: MORTALITY CHART IMAGE */}
      <section className="mortality-chart-section reveal mt-12">
        <div className="max-w-content mx-auto px-6 mb-8">
          <h3 className="font-sans font-semibold text-2xl text-navy">
            Malaria Mortality: Children Lost
          </h3>
        </div>
        <div className="max-w-[1100px] mx-auto px-4">
          <ImagePlaceholder 
            id="mortality-chart"
            src="https://lh3.googleusercontent.com/pw/AP1GczOe5c0M62JwyWJ0LJXv4tI-dNW0-3LIPJo6wQzeDIlQwJnKTXl6-BINtY34wYeq4pflfXi0f6fsEiuywrzW7MNf8hgpPA-DsaWZdkzC0qo1bR4w6EF-0eUtEi9r-x_25uI8NZMp1J88F0DQm_ihBXe5=w3024-h1482-s-no-gm?authuser=0"
            alt="Pictorial bar chart showing malaria mortality 2015-2024 using coffin icons"
          />
        </div>
      </section>

      {/* SECTION 11B: NARRATIVE HEALTHY */}
      <NarrativeSection>
        <p className="mb-8">
          Take all the children who would have filled sick wards in 2015. Now send half of them home healthy, <strong className="text-teal font-bold">104,000</strong> children chasing guinea fowls in the yard instead of lying in hospital beds. That is <strong className="text-teal font-bold">104,000</strong> more days for mothers to harvest their crops. That is <strong className="text-teal font-bold">104,000</strong> more nights of peaceful sleep instead of anxious vigils by a feverish child's side.
        </p>
        <p className="mt-10">
          The playgrounds began to fill again. The sounds of children returned to compounds across West Mamprusi. Mothers like Salima could watch the gathering clouds and feel joy without the shadow of dread.
        </p>
      </NarrativeSection>

      {/* SECTION 12: WATERCOLOR CHILDREN */}
      <section className="reveal px-4 md:px-0 max-w-[1400px] mx-auto mt-16 mb-12">
        <ImagePlaceholder 
          id="children-playing" 
          src="https://lh3.googleusercontent.com/pw/AP1GczMB9CyVTbxx2wyKs1BAeeWESSRsKM8sX2EuUcUd9KuDvpE-FEEvP1kIYI7ID5ezUt_SHCloIIB0-uSeGfY9TF7WoiPgJU1dTK6IXilCstQiYt1mcdqRfHYbC2fvODyiyGsy3YMvbPrBpaUE0xd9Zaxl=w1024-h1024-s-no-gm?authuser=0"
          alt="Children playing freely with tires and games in the village"
        />
      </section>

      {/* SECTION 13: CLOSING NARRATIVE */}
      <NarrativeSection>
        <h2 className="font-sans font-bold text-section-title text-teal mb-8 text-center">
          Turning the Tide
        </h2>
        <p className="mb-4">
          Without SMC, West Mamprusi's rainy-season transmission which is already intense might have soared even higher as climate patterns shifted and the population increased. Instead, the tide began to turn. But this is not the end of the story. Programs like SMC do not eliminate malaria overnight. They shift the trajectory. Continued adherence to prevention interventions, sleeping under insecticide-treated nets, seeking treatment early, supporting Community Health Volunteers will keep the tide turning. 
        </p>
        <p className="mb-4">
          Children like Ali will live to celebrate many birthdays and see their dreams fulfilled. They will rejoice in the rain, filling playgrounds with sounds of joy and excitement, healthy and strong. Community leaders will sit under their huts and watch the playground with pride. 
        </p>
        <p className="font-semibold text-teal mt-2">
          Mothers like Salima will harvest their groundnuts in peace, no longer fearing what the rain brings.
        </p>
      </NarrativeSection>

      {/* SECTION 14: FINAL VISUAL + TEXT */}
      <section className="reveal px-4 md:px-0 max-w-[1400px] mx-auto mt-20">
        <ImagePlaceholder 
          id="family-closing" 
          src="https://lh3.googleusercontent.com/pw/AP1GczOhuCszI0Surz7qv_pCo6d4zHqOdKOWKfkRijg4KE_rbfb1AZEApSwIHPT_442VFEpQhOHdPMclf_9W3IAHXUpayFc9u_FugMpmT0KNjS0cHzdT1tOskaB3QMnUNYFaWV0EhN1lfB3xVB_RErwOM2b5=w1024-h1024-s-no-gm?authuser=0"
          alt="Intimate scene of a grandmother with children in warm light"
        />
      </section>

      <NarrativeSection>
        <p className="mb-6">
          Remains of the <em>Birnigoomni</em> wall still stands today as a testament to what communities can build when they commit to protecting their own. SMC is West Mamprusi's new wall, a shield of defence for a new generation. Behind every number in the data, there is a child who will grow up healthy, a mother who will sleep sound, and a community that chose to fight back.
        </p>
        <p className="font-bold text-teal text-lg md:text-xl mt-10">
          The numbers tell part of the story. The people tell the rest.
        </p>
      </NarrativeSection>

      {/* SECTION 15: FOOTER */}
      <footer className="bg-dark-footer text-text-light py-16 px-6 mt-20 border-t border-teal/50">
        <div className="max-w-content mx-auto text-center font-sans space-y-4">
          <h3 className="font-medium text-lg mb-6">Heavy Weight on Small Shoulders</h3>
          <p className="text-sm opacity-80">Author: Michael Arthur — Master's Thesis, Northeastern University</p>
          <p className="text-sm opacity-80">Data Sources: Ghana Health Service. National Malaria Elimination Program — Ghana.</p>
          <p className="text-sm opacity-60 mt-8">2026</p>
        </div>
      </footer>

    </main>
  );
};

export default App;