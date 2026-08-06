import type {ReactNode} from "react";

type PageHeroProps={title:string;subtitle?:string;backgroundImage?:string;className?:string;children?:ReactNode};

export default function PageHero({title,subtitle,backgroundImage,className="",children}:PageHeroProps){
  return <section className={`page-heading ${className}`.trim()} style={backgroundImage?{backgroundImage:`url(${backgroundImage})`}:undefined}>
    <div className="container"><div className="row"><div className="col-md-12"><h1>{title}</h1>{subtitle&&<span>{subtitle}</span>}{children}</div></div></div>
  </section>
}