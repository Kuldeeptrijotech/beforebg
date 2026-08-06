import type {ReactNode} from "react";

export type TextCard={title:ReactNode;description:ReactNode};
type CardGridProps={cards:readonly TextCard[];className?:string;cardClassName?:string};

export default function CardGrid({cards,className="",cardClassName=""}:CardGridProps){
  return <div className={className}>{cards.map((card,index)=><article className={cardClassName} key={index}><h4>{card.title}</h4><p>{card.description}</p></article>)}</div>
}