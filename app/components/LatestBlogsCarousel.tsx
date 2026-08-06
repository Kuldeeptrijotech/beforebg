"use client";

import {useCallback,useEffect,useRef,useState} from "react";
import {blogs} from "../data/blogs";
import BlogCard from "./common/BlogCard";

export default function LatestBlogsCarousel(){
  const viewport=useRef<HTMLDivElement>(null);
  const [index,setIndex]=useState(0);
  const move=useCallback((next:number)=>{const value=(next+blogs.length)%blogs.length;setIndex(value);const first=viewport.current?.querySelector<HTMLElement>(".latest-blog-card");if(viewport.current&&first)viewport.current.scrollTo({left:value*(first.offsetWidth+24),behavior:"smooth"})},[]);
  useEffect(()=>{const timer=window.setInterval(()=>move(index+1),4000);return()=>window.clearInterval(timer)},[index,move]);
  return <section className="latest-blogs-section" aria-labelledby="latest-blogs-title"><div className="latest-blogs-heading"><div><span>Keep exploring</span><h2 id="latest-blogs-title">Latest <em>Blogs</em></h2></div><div className="latest-blog-controls"><button type="button" onClick={()=>move(index-1)} aria-label="Previous blogs">‹</button><button type="button" onClick={()=>move(index+1)} aria-label="Next blogs">›</button></div></div><div className="latest-blogs-viewport" ref={viewport}><div className="latest-blogs-track">{blogs.map(blog=><BlogCard blog={blog} variant="carousel" key={blog.link}/>)}</div></div></section>
}