import Link from "next/link";

type ContactCtaProps={className?:string;label?:string};

export default function ContactCta({className="",label="Contact Us"}:ContactCtaProps){
  return <section className={`flex justify-center bg-[#121927] px-5 py-11 ${className}`}><Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-cyan-400 bg-cyan-400 px-6 py-3 font-semibold !text-[#06202a]">{label}</Link></section>
}
