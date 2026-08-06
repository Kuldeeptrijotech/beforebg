import LatestBlogsCarousel from "./LatestBlogsCarousel";
import ContactCta from "./common/ContactCta";
import ArticleBlocks,{type ContentBlock} from "./common/ArticleBlocks";

type Props={title:string;description?:string;blocks:ContentBlock[];className?:string};

export default function LegacyHtmlPage({title,description="",blocks,className="legacy-content-page"}:Props){
  const latestIndex=blocks.findIndex(block=>block.type==="heading"&&String(block.text??"").toLowerCase().includes("latest blogs"));
  const articleBlocks=(latestIndex<0?blocks:blocks.slice(0,latestIndex)).filter(block=>!(block.type==="heading"&&String(block.text??"").trim()===title.trim()));
  return <main className={className}>
    <article className="legacy-article">
      <header className="legacy-article-hero"><span className="legacy-article-kicker"><span className="brand-name">Trijotech</span> <span className="brand-accent">Insights</span></span><h1>{title}</h1>{description&&<p>{description}</p>}</header>
      <div className="legacy-article-body"><ArticleBlocks blocks={articleBlocks}/></div>
    </article>
    
      <LatestBlogsCarousel/>
    
      <ContactCta/>
  </main>
}