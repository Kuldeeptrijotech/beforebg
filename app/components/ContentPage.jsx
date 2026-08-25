import Link from "next/link";

export default function ContentPage({ eyebrow, title, description, highlights, action = { href: "", label: "" }, showHero = true }) {
  return (
    <main className="public-alternating-page">
      {showHero && <section className="page-hero">
        <div className="content-shell">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-copy">{description}</p>
          {action.href && <Link className="primary-action" href={action.href}>{action.label}</Link>}
        </div>
      </section>}
      <section className="content-section">
        <div className="content-shell">
          <div className="section-intro"><p className="eyebrow">What we do</p><h2>Built for the work that matters.</h2></div>
          <div className="highlight-grid">
            {highlights.map((highlight) => <article className="highlight" key={highlight.title}><h3>{highlight.title}</h3><p>{highlight.description}</p></article>)}
          </div>
        </div>
      </section>
    </main>
  );
}
