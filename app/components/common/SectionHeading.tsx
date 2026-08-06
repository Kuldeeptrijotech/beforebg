import type {ReactNode} from "react";

type SectionHeadingProps={title:ReactNode;description?:ReactNode;eyebrow?:string;className?:string};

export default function SectionHeading({title,description,eyebrow,className=""}:SectionHeadingProps){
  return <div className={`section-heading ${className}`.trim()}>{eyebrow&&<span className="section-eyebrow">{eyebrow}</span>}<h2>{title}</h2>{description&&<p>{description}</p>}</div>
}