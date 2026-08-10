import type {ReactNode} from "react";
import Image from "next/image";

type PageHeroProps={title:string;subtitle?:string;backgroundImage?:string;className?:string;children?:ReactNode};

export default function PageHero({title,subtitle,backgroundImage,className="",children}:PageHeroProps){
  return <section className={`page-heading ${className}`.trim()}>
    {backgroundImage && <Image src={backgroundImage} alt="" fill priority sizes="100vw" className="page-heading-image" />}
    {backgroundImage && <div className="page-heading-image-overlay" aria-hidden="true" />}
    <div className="container page-heading-inner"><div className="row"><div className="col-md-12"><h1>{title}</h1>{subtitle&&<span>{subtitle}</span>}{children}</div></div></div>
  </section>
}
