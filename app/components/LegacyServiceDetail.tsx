import Link from "next/link";
import PageHero from "./common/PageHero";
import ContactCta from "./common/ContactCta";
import CardGrid from "./common/CardGrid";
import SectionHeading from "./common/SectionHeading";

export type ServiceCard={title:string;description:string};
export type ImpactCard={title:string;description:string;image:string};

const resultCards=[
  {title:"Streamlining Financial Operations for a Global Manufacturer",description:"“A global manufacturing company struggled with delayed financial closings and inconsistent reporting. Trijotech implemented SAP S/4HANA with Group Reporting, enabling faster consolidations, improved accuracy, and greater visibility across entities.”"},
  {title:"Retail Transformation Through Real-Time Analytics",description:"“A growing retail chain struggled with delayed and inconsistent reporting across departments. Trijotech implemented SAP Analytics Cloud to unify data and deliver real-time dashboards for sales, finance, and operations. The leadership team now makes faster, data-driven decisions with clear visibility into key business metrics.”"},
];

export function ServiceHero({title,image}:{title:string;image:string}){
  return <PageHero title={title} backgroundImage={image} className="legacy-service-hero"><Link href="/contact" className="filled-button">Consult Our Experts</Link></PageHero>
}

export function ContactButton(){return <ContactCta className="legacy-service-contact industry-source-page"/>}

export function OfferingGrid({heading,intro,cards}:{heading:React.ReactNode;intro:string;cards:ServiceCard[]}){
  return <section className="legacy-service-offerings"><div className="container"><SectionHeading title={heading} description={intro}/><CardGrid cards={cards} className="legacy-offering-grid"/></div></section>
}

export function ImpactGrid({cards}:{cards:ImpactCard[]}){
  return <section className="legacy-impact-section"><div className="container"><SectionHeading title={<>Real <em>Business Impact</em></>}/><div className="legacy-impact-grid">{cards.map(card=><article key={card.title}><img src={card.image} alt=""/><div><h4>{card.title}</h4><p>{card.description}</p></div></article>)}</div></div></section>
}

export function Results(){
  return <section className="legacy-service-results"><div className="container"><SectionHeading title={<>From implementation to <em>Business advantage</em></>} description="Explore how business achieved real result through our SAP-driven solution"/><CardGrid cards={resultCards} className="legacy-results-grid"/></div></section>
}