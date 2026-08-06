import Link from "next/link";
import type {ReactNode} from "react";

type MediaTextRowProps={title:ReactNode;description:string;image:string;imageAlt:string;href?:string;bullets?:readonly string[];className?:string};

export default function MediaTextRow({title,description,image,imageAlt,href,bullets,className=""}:MediaTextRowProps){
  return <article className={`more-info ${className}`.trim()}><div className="container"><div className="row"><div className="col-md-6"><div className="left-image"><img src={image} alt={imageAlt}/></div></div><div className="col-md-6 align-self-center"><div className="right-content"><h2>{title}</h2><p>{description}</p>{bullets&&<ul>{bullets.map(item=><li key={item}><p>{item}</p></li>)}</ul>}{href&&<Link href={href} className="filled-button">Read More</Link>}</div></div></div></div></article>
}