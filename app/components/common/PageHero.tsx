import type {ReactNode} from "react";

type PageHeroProps={title:ReactNode;subtitle?:string;backgroundImage?:string;className?:string;children?:ReactNode};

export default function PageHero({title,subtitle,backgroundImage,className="",children}:PageHeroProps){
  return <section
    className={`page-heading relative ${className}`.trim()}
    style={backgroundImage ? {
      backgroundImage: `url("${backgroundImage}")`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    } : undefined}
  >
    {backgroundImage && <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cyan-950/70 via-transparent to-slate-950/20" aria-hidden="true" />}
    <div className="container page-heading-inner" style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}><div className="row" style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center" }}><div className="col-md-12 page-heading-content" style={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}><h1 style={{ marginRight: "auto", marginLeft: "auto", textAlign: "center" }}>{title}</h1>{subtitle&&<span>{subtitle}</span>}{children}</div></div></div>
  </section>
}
