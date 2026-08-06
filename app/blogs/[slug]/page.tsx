import type {Metadata} from "next";
import {notFound} from "next/navigation";
import LegacyHtmlPage from "../../components/LegacyHtmlPage";
import {legacyBlogPages} from "../../data/legacyPages";

type Slug=keyof typeof legacyBlogPages;
const asciiSlug=(slug:string)=>slug.replace(/[–—]/g,"-");
const getPage=(slug:string)=>legacyBlogPages[slug as Slug]??Object.entries(legacyBlogPages).find(([key])=>asciiSlug(key)===slug)?.[1];
export function generateStaticParams(){return [...new Set(Object.keys(legacyBlogPages).flatMap(slug=>[slug,asciiSlug(slug)]))].map(slug=>({slug}))}
export async function generateMetadata({params}:PageProps<"/blogs/[slug]">):Promise<Metadata>{const{slug}=await params,page=getPage(slug);return page?{title:page.title,description:page.description||undefined}:{}}
export default async function Page({params}:PageProps<"/blogs/[slug]">){const{slug}=await params,page=getPage(slug);if(!page)notFound();return <LegacyHtmlPage title={page.title} description={page.description} blocks={page.blocks} className="legacy-content-page legacy-blog-page"/>}