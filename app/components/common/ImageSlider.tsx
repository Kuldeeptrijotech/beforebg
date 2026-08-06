"use client";

import {useState} from "react";

type ImageSliderProps={images:string[];label:string;className?:string};

export default function ImageSlider({images,label,className="case-slider"}:ImageSliderProps){
  const[current,setCurrent]=useState(0);const move=(offset:number)=>setCurrent((current+offset+images.length)%images.length);
  return <div className={className} aria-label={label}><div className="case-slider-viewport"><img src={images[current]} alt={`${label} – slide ${current+1}`}/><button className="case-slider-arrow previous" onClick={()=>move(-1)} aria-label="Previous slide">‹</button><button className="case-slider-arrow next" onClick={()=>move(1)} aria-label="Next slide">›</button></div><div className="case-slider-pagination" aria-label="Choose slide">{images.map((_,index)=><button key={index} className={index===current?"active":""} onClick={()=>setCurrent(index)} aria-label={`Go to slide ${index+1}`} aria-current={index===current?"true":undefined}/>)}</div></div>
}