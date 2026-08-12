import Link from "next/link";
import type {Blog} from "../../data/blogs";

type BlogCardProps={blog:Blog;variant?:"listing"|"carousel"};

export default function BlogCard({blog,variant="listing"}:BlogCardProps){
  if(variant==="carousel")return <article className="latest-blog-card"><Link href={blog.link} className="latest-blog-image"><img src={blog.image} alt={blog.title} loading="lazy"/></Link><div className="latest-blog-copy"><span>{blog.date}</span><h3><Link href={blog.link}>{blog.title}</Link></h3><p>{blog.description}</p><Link href={blog.link} className="latest-blog-link">Read article →</Link></div></article>;
  const cropVerticalWhitespace = blog.title === "SAP S/4HANA Group Reporting : Overview";
  return <article className="service-item blog-card"><Link href={blog.link} className={`blog-card-image${cropVerticalWhitespace ? " crop-vertical-whitespace" : ""}`} aria-label={`Read blog: ${blog.title}`}><img loading="lazy" src={blog.image} alt={blog.title} className="img-fluid"/></Link><div className="down-content blog-card-content"><div className="blog-meta"><span><i className="fa fa-calendar" aria-hidden="true"/> {blog.date}</span></div><h4>{blog.title}</h4><p>{blog.description}</p><Link href={blog.link} className="filled-button read-more">Read More</Link></div></article>
}
