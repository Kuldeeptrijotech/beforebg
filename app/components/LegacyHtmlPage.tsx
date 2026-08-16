import LatestBlogsCarousel from "./LatestBlogsCarousel";
import ContactCta from "./common/ContactCta";
import ArticleBlocks,{type ContentBlock} from "./common/ArticleBlocks";

type Props={title:string;description?:string;blocks:ContentBlock[];className?:string;heroImage?:string};

export default function LegacyHtmlPage({title,description="",blocks,className="legacy-content-page",heroImage}:Props){
  const latestIndex=blocks.findIndex(block=>block.type==="heading"&&String(block.text??"").toLowerCase().includes("latest blogs"));
  const articleBlocks=(latestIndex<0?blocks:blocks.slice(0,latestIndex)).filter(block=>!(block.type==="heading"&&String(block.text??"").trim()===title.trim()));
  return <main className={`${className} bg-[linear-gradient(#edf6f3_0,#f8faf9_420px,#fff_100%)] px-5 pb-[90px] pt-[118px]`}>
    <article className="mx-auto w-full max-w-[960px]">
      <header className="rounded-t-[18px] bg-[linear-gradient(125deg,#075f59_0,#087b71_60%,#15978b_100%)] px-[clamp(24px,7vw,72px)] py-[58px] text-white shadow-[0_18px_48px_#075f592e] max-[640px]:px-5 max-[640px]:pb-[45px] max-[640px]:pt-[115px]" style={heroImage ? {backgroundImage: `linear-gradient(90deg, rgba(10, 25, 48, .94), rgba(10, 25, 48, .35)), url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center"} : undefined}><span className="mb-[18px] block text-[12px] font-extrabold uppercase tracking-[.14em] text-[#bff4ea]"><span>Trijotech</span> <span>Insights</span></span><h1 className="m-0 max-w-none text-[clamp(32px,5vw,54px)] font-bold leading-[1.13] tracking-[-.02em] text-white">{title}</h1>{description&&<p className="mt-5 max-w-[760px] text-[17px] leading-[1.7] text-[#dff8f3]">{description}</p>}</header>
      <div className="rounded-b-[18px] border border-t-0 border-[#e1e8e7] bg-slate-50 px-[clamp(24px,7vw,72px)] py-[58px] !text-[#172033] opacity-100 shadow-[0_24px_60px_#122a3114] [filter:none] [backdrop-filter:none] [&_a]:!text-[#117a4b] [&_a]:font-[650] [&_div]:!text-[#27364a] [&_h1]:!text-[#0f2137] [&_h1]:font-bold [&_h2]:my-[18px] [&_h2]:mt-[52px] [&_h2]:text-[clamp(25px,3vw,34px)] [&_h2]:font-bold [&_h2]:leading-[1.28] [&_h2]:!text-[#0f2137] [&_h3]:mb-[14px] [&_h3]:mt-[38px] [&_h3]:text-[22px] [&_h3]:font-bold [&_h3]:leading-[1.35] [&_h3]:!text-[#0f2137] [&_li]:my-[10px] [&_li]:pl-[6px] [&_li]:leading-[1.7] [&_li]:!text-[#27364a] [&_ol]:mb-7 [&_ol]:mt-1 [&_ol]:pl-[26px] [&_p]:mb-[22px] [&_p]:overflow-wrap-anywhere [&_p]:text-left [&_p]:text-[17px] [&_p]:leading-[1.8] [&_p]:!text-[#27364a] [&_span]:!text-[#27364a] [&_ul]:mb-7 [&_ul]:mt-1 [&_ul]:pl-[26px] max-[640px]:!px-[18px] max-[640px]:!py-9"><ArticleBlocks blocks={articleBlocks}/></div>
    </article>
    
      <LatestBlogsCarousel/>
    
      <ContactCta/>
  </main>
}
