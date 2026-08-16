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
  return <figure className={`my-[38px] w-full text-center max-[640px]:my-[26px] legacy-image-${layout}`}><img className="mx-auto block max-h-[720px] max-w-full rounded-[10px] object-contain shadow-[0_12px_34px_#122a3124] max-[640px]:rounded-md" src={String(block.src??"")} alt={String(block.alt??"")} width={Number(block.width)||undefined} height={Number(block.height)||undefined} loading="lazy"/></figure>
}

function ArticleTable({block}:{block:ContentBlock}){
  const rows=Array.isArray(block.rows)?block.rows as unknown[][]:[];
  return <div className="my-[34px] w-full overflow-x-auto rounded-[10px] border border-[#dce5e4]"><table className="w-full min-w-[620px] border-collapse text-[14px] text-[#33454f]"><tbody>{rows.map((row,rowIndex)=><tr className="odd:[&_td]:bg-[#f5f9f8]" key={rowIndex}>{row.map((cell,cellIndex)=>rowIndex===0?<th className="bg-[#087b71] p-[15px] text-left font-bold text-white" key={cellIndex}>{String(cell)}</th>:<td className="border-t border-[#dce5e4] px-[15px] py-[14px] align-top leading-[1.55]" key={cellIndex}>{String(cell)}</td>)}</tr>)}</tbody></table></div>
}

export default function ArticleBlocks({blocks}:{blocks:ContentBlock[]}){
  return <>{blocks.map((block,index)=>{
    if(block.type==="heading"){const text=String(block.text??"");return Number(block.level)<=2?<h2 key={index}>{text}</h2>:<h3 key={index}>{text}</h3>}
    if(block.type==="paragraph")return <RichParagraph block={block} index={index} key={index}/>;
    if(block.type==="quote")return <blockquote className="my-[34px] rounded-r-lg border-l-[5px] border-[#ee9e1e] bg-[#fff8ec] px-[26px] py-[22px] text-[16px] italic leading-[1.75] text-[#4c4234]" key={index}>{String(block.text??"")}</blockquote>;
    if(block.type==="image")return <ArticleImage block={block} key={index}/>;
    if(block.type==="list"){const items=Array.isArray(block.items)?block.items.map(String):[];return block.ordered?<ol key={index}>{items.map((item,itemIndex)=><li key={itemIndex}>{item}</li>)}</ol>:<ul key={index}>{items.map((item,itemIndex)=><li key={itemIndex}>{item}</li>)}</ul>}
    if(block.type==="table")return <ArticleTable block={block} key={index}/>;
    return null;
  })}</>
}
