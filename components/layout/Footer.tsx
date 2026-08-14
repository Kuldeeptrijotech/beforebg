import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-data";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const socialIcons: Record<string, IconType> = {
  YouTube: FaYoutube,
  LinkedIn: FaLinkedinIn,
  X: FaXTwitter,
};

export default function Footer() {
  const { footer } = siteConfig;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="zip-footer overflow-hidden bg-[#050817] font-sans text-white">
      <div className="border-t border-white/10">
        <Container className="py-12 md:py-14">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] xl:gap-16">
            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3"
            >
              {footer.columns.map((column) => (
                <div key={column.title}>
                  <h2 className="m-0 text-[18px] font-semibold uppercase leading-6 tracking-[0.08em] text-white" style={{ fontSize: "18px" }}>
                    {column.title}
                  </h2>

                  <ul className="m-0 mt-5 list-none space-y-3 p-0">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.label}-${link.href}`}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 text-sm font-medium leading-6 text-white/60 no-underline transition hover:translate-x-0.5 hover:text-cyan-200"
                        >
                          {link.label}
                          <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="grid gap-6 sm:grid-cols-2">
              {footer.contact.addresses.map((address) => (
                <address key={address.title} className="m-0 rounded-xl border border-white/10 bg-white/[0.04] p-5 not-italic">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/6 text-cyan-200">
                      <MapPin className="size-4" />
                    </span>
                    <h2 className="m-0 text-[18px] font-semibold uppercase leading-6 tracking-[0.06em] text-white" style={{ fontSize: "18px" }}>
                      {address.title}
                    </h2>
                  </div>

                  <p className="m-0 mt-4 text-sm font-medium leading-6 text-white/65">
                    {address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </address>
              ))}

              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 sm:col-span-2">
                <h2 className="m-0 text-sm font-semibold text-white">
                  Talk to our team
                </h2>

                <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href={`mailto:${footer.contact.email}`}
                    className="footer-contact-email inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-4 py-2 text-sm font-semibold text-cyan-300 no-underline transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.14] sm:w-fit"
                  >
                    <Mail className="size-4" />
                    {footer.contact.email}
                  </a>
                  {footer.contact.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="footer-contact-phone inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-2 text-sm font-semibold text-emerald-300 no-underline transition hover:border-emerald-300/40 hover:bg-emerald-300/[0.14] sm:w-fit"
                    >
                      <Phone className="size-4" />
                      {phone.label}
                    </a>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="border-y border-white/10 bg-white/3">
          <Container className="py-5">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                {footer.badges.map((badge) => (
                  <div
                    key={badge.src}
                    className="flex min-h-16 min-w-32 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2"
                  >
                    <Image
                      src={badge.src}
                      alt={badge.label}
                      width={badge.width}
                      height={badge.height}
                      className="h-auto max-h-12 w-auto max-w-32 object-contain sm:max-h-14"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {footer.socialLinks.map((socialLink) => {
                  const Icon = socialIcons[socialLink.label];

                  return (
                    <a
                      key={socialLink.href}
                      href={socialLink.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={socialLink.label}
                      title={socialLink.label}
                      className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 no-underline transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/[0.1] hover:text-cyan-100"
                    >
                      {Icon ? <Icon className="size-4.5" /> : <ArrowUpRight className="size-4.5" />}
                    </a>
                  );
                })}
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="m-0 text-sm leading-6 text-white/50">
              Copyright &copy;  Trijotech Software Consulting Pvt. Ltd. {currentYear}. All
              rights reserved.
            </p>

          </div>
        </Container>
      </div>
    </footer>
  );
}
