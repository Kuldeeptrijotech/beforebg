import type {ReactNode} from "react";

export type ContentBlock={type:string;[key:string]:unknown};

function RichParagraph({block,index}:{block:ContentBlock;index:number}){
  const text=String(block.text??"");
  const links=Array.isArray(block.links)?block.links as Array<{text:string;href:string}>:[];
  let cursor=0;const content:ReactNode[]=[];
  for(const link of links){const position=text.indexOf(link.text,cursor);if(position<0)continue;content.push(text.slice(cursor,position));content.push(<a key={`${index}-${position}`} href={link.href} target={link.href.startsWith("http")?"_blank":undefined} rel={link.href.startsWith("http")?"noreferrer":undefined}>{link.text}</a>);cursor=position+link.text.length}
  content.push(text.slice(cursor));return <p>{content}</p>
}

function ArticleImage({block}:{block:ContentBlock}){
  const layout=["wide","standard","compact"].includes(String(block.layout))?String(block.layout):"standard";
  return <figure className={`legacy-article-image legacy-image-${layout}`}><img src={String(block.src??"")} alt={String(block.alt??"")} width={Number(block.width)||undefined} height={Number(block.height)||undefined} loading="lazy"/></figure>
}

function ArticleTable({block}:{block:ContentBlock}){
  const rows=Array.isArray(block.rows)?block.rows as unknown[][]:[];
  return <div className="legacy-article-table"><table><tbody>{rows.map((row,rowIndex)=><tr key={rowIndex}>{row.map((cell,cellIndex)=>rowIndex===0?<th key={cellIndex}>{String(cell)}</th>:<td key={cellIndex}>{String(cell)}</td>)}</tr>)}</tbody></table></div>
}

export default function ArticleBlocks({blocks}:{blocks:ContentBlock[]}){
  return <>{blocks.map((block,index)=>{
    if(block.type==="heading"){const text=String(block.text??"");return Number(block.level)<=2?<h2 key={index}>{text}</h2>:<h3 key={index}>{text}</h3>}
    if(block.type==="paragraph")return <RichParagraph block={block} index={index} key={index}/>;
    if(block.type==="quote")return <blockquote key={index}>{String(block.text??"")}</blockquote>;
    if(block.type==="image")return <ArticleImage block={block} key={index}/>;
    if(block.type==="list"){const items=Array.isArray(block.items)?block.items.map(String):[];return block.ordered?<ol key={index}>{items.map((item,itemIndex)=><li key={itemIndex}>{item}</li>)}</ol>:<ul key={index}>{items.map((item,itemIndex)=><li key={itemIndex}>{item}</li>)}</ul>}
    if(block.type==="table")return <ArticleTable block={block} key={index}/>;
    return null;
  })}</>
}