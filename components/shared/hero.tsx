"use client";
import { useEffect, useRef } from "react";
import { H1 } from "../common/H1";
import anime from "animejs";
import { Button } from "../ui/button";

interface HeroProps {
  heroRef: React.RefObject<HTMLDivElement>;
  tableRef: React.RefObject<HTMLDivElement>;
  chartRef?: React.RefObject<HTMLDivElement>;
}

const Hero:React.FC<HeroProps> = ({heroRef, tableRef, chartRef}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    anime({
      targets: container,
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 2000,
      easing: "easeInOutExpo",
    });
  }, []);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if(ref.current){
      ref.current.scrollIntoView({behavior:"smooth"})
    }
  };

  return (
    <section
    ref={heroRef}
      id="hero"
      className="h-full flex flex-col items-center justify-center"
    >
      <div
        ref={containerRef}
        className="flex flex-col space-y-8 p-6 border-2 border-pink-800 filter drop-shadow-md rounded-xl bg-black/50"
      >
        <div className="-space-y-1">
          <H1 className="md:text-5xl lg:text-8xl">Top ML Engineer Salaries</H1>
          <hr />
        </div>
        <div className="w-full flex justify-around">
          <Button onClick={()=> scrollToRef(tableRef)}
            variant="outline"
            className="border-2 border-l-4 border-l-rose-600 text-lg px-2 py-4 scale-110"
          >
            Tables
          </Button>
          <Button onClick={()=> scrollToRef(chartRef!)}
            variant="outline"
            className="border-2 border-l-4 border-l-rose-600 text-lg px-2 py-4 scale-110"
          >
            Charts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
