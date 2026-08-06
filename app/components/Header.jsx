"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import lightLogo from "../assets/image/L09 img 01.png";
import coloredLogo from "../assets/new_/Trijotech_colored.svg";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", children: [
    { href: "/services/sap-implementation", label: "SAP Implementation" },
    { href: "/services/sap-support", label: "SAP Support" },
    { href: "/services/sap-btp-full-stack", label: "SAP BTP Full Stack Application" },
    { href: "/services/sap-data-integration", label: "SAP Data Integration" },
    { href: "/services/sap-ai-ml", label: "SAP AI & ML" },
  ]},
  { href: "/products", label: "Products" },
  { href: "/industry", label: "Industry" },
  { href: "/blogs", label: "Insights", children: [
    { href: "/blogs", label: "Blogs" },
    { href: "/case-studies", label: "Case Studies" },
  ]},
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();
  const [homeHeaderState, setHomeHeaderState] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const updateHeader = () => {
      const hero = document.querySelector(".hero-carousel, .page-heading, .case-studies-hero, .legacy-article-hero");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom + window.scrollY : window.innerHeight;
      if (window.scrollY <= 10) setHomeHeaderState("top");
      else if (window.scrollY < heroBottom - 82) setHomeHeaderState("hidden");
      else setHomeHeaderState("solid");
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, [pathname]);

  const closeMenus = () => { setMenuOpen(false); setOpenMenu(null); };
  const headerState = `home-${homeHeaderState}`;

  return (
    <header className={`site-header ${headerState}`}>
      <div className="header-inner">
        <Link href="/" className="brand" onClick={closeMenus} aria-label="Trijotech home">
          <Image src={lightLogo} alt="Trijotech" width={150} height={80} priority className="brand-logo brand-logo-light" />
          <Image src={coloredLogo} alt="Trijotech" width={150} height={67} priority className="brand-logo brand-logo-colored" />
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((current) => !current)}>
          <span className="menu-toggle-line" /><span className="menu-toggle-line" /><span className="menu-toggle-line" />
          <span className="sr-only">Toggle navigation</span>
        </button>
        <nav id="primary-navigation" className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <ul>
            {navigation.map((item) => {
              const active = pathname === item.href || Boolean(item.children?.some((child) => pathname === child.href));
              return (
                <li key={item.label} className={`nav-item ${item.children ? "has-menu" : ""} ${active ? "is-active" : ""}`}>
                  {item.children ? <>
                    <div className="nav-parent-control">
                      <Link href={item.href} onClick={closeMenus}>{item.label}</Link>
                      <button type="button" className="nav-dropdown-toggle" aria-label={`Toggle ${item.label} menu`} aria-expanded={openMenu === item.label} onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}>
                        <span className="nav-trigger-icon" aria-hidden="true">▾</span>
                      </button>
                    </div>
                    <ul className={`subnav ${openMenu === item.label ? "is-open" : ""}`}>
                      {item.children.map((child) => <li key={child.label}><Link href={child.href} onClick={closeMenus}>{child.label}</Link></li>)}
                    </ul>
                  </> : <Link href={item.href} onClick={closeMenus}>{item.label}</Link>}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

