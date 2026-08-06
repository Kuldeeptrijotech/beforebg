import Link from "next/link";

type ContactCtaProps={className?:string;label?:string};

export default function ContactCta({className="industry-source-contact industry-source-page",label="Contact Us"}:ContactCtaProps){
  return <section className={className}><Link href="/contact" className="filled-button">{label}</Link></section>
}