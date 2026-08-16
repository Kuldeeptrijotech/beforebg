import Link from "next/link";
import type { Blog } from "../../data/blogs";

type BlogCardProps = { blog: Blog; variant?: "listing" | "carousel" };

export default function BlogCard({ blog, variant = "listing" }: BlogCardProps) {
  if (variant === "carousel") {
    return (
      <article className="flex min-h-[450px] w-[clamp(280px,29vw,370px)] shrink-0 basis-[clamp(280px,29vw,370px)] flex-col overflow-hidden rounded-[14px] border border-slate-300 bg-white shadow-[0_12px_28px_rgba(15,23,42,.12)] sm:min-h-[470px] max-[640px]:w-[82vw] max-[640px]:basis-[82vw]">
        <Link href={blog.link} className="block h-[210px] min-h-[210px] w-full overflow-hidden bg-[#dbe4ec] max-[640px]:h-[190px] max-[640px]:min-h-[190px]">
          <img src={blog.image} alt={blog.title} loading="lazy" className="h-full w-full object-fill opacity-100 [filter:none] [transform:none]" />
        </Link>
        <div className="flex min-h-0 flex-1 flex-col bg-white p-5">
          <span className="text-[13px] font-bold !text-[#117a4b] opacity-100">{blog.date}</span>
          <h3 className="my-[9px] line-clamp-2 min-h-[53px] max-h-[53px] overflow-hidden text-[18px] font-bold leading-[1.45] !text-[#0f172a]">
            <Link href={blog.link} className="!text-[#0f172a] opacity-100">{blog.title}</Link>
          </h3>
          <p className="mb-[14px] line-clamp-3 max-h-[67px] overflow-hidden text-[14px] leading-[1.6] !text-[#475569] opacity-100">{blog.description}</p>
          <Link href={blog.link} className="mt-auto text-[14px] font-extrabold !text-[#117a4b] opacity-100">Read article →</Link>
        </div>
      </article>
    );
  }

  const cropVerticalWhitespace = blog.title === "SAP S/4HANA Group Reporting : Overview";
  return (
    <article className="flex min-h-[460px] w-full flex-col overflow-hidden rounded-[14px] border border-[#33445d] bg-[#142238] p-0 shadow-[0_16px_34px_rgba(0,0,0,.28)]">
      <Link href={blog.link} className="m-0 h-[220px] overflow-hidden bg-[#091321]" aria-label={`Read blog: ${blog.title}`}>
        <img loading="lazy" src={blog.image} alt={blog.title} className={`m-0 h-full w-full object-fill p-0 opacity-100 [filter:none] ${cropVerticalWhitespace ? "scale-y-[1.12]" : "[transform:none]"}`} />
      </Link>
      <div className="flex min-h-[238px] flex-1 flex-col bg-[#142238] p-5">
        <div className="!text-cyan-300"><span>{blog.date}</span></div>
        <h4 className="text-[18px] leading-[1.4] !text-white">{blog.title}</h4>
        <p className="line-clamp-3 min-h-[4.8em] max-h-[4.8em] text-[14px] leading-[1.6] !text-[#b9cbd6]">{blog.description}</p>
        <Link href={blog.link} className="mt-auto w-fit bg-cyan-400 !text-[#06202a]">Read More</Link>
      </div>
    </article>
  );
}
