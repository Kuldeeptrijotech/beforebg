import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-data";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
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
    <footer className="zip-footer relative overflow-hidden bg-[#050817] font-sans text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 tri-hex-grid" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(41,171,135,0.8),rgba(245,166,35,0.8),transparent)]" />

      <div className="relative border-t border-white/10">
        <Container className="py-12 md:py-14">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] xl:gap-16">
            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3"
            >
              {footer.columns.map((column) => (
                <div key={column.title}>
                  <h2 className="relative m-0 w-fit text-[18px] font-semibold uppercase leading-6 tracking-[0.08em] text-white">
                    {column.title}
                    <span aria-hidden className="absolute -bottom-1.5 left-0 h-0.5 w-8 rounded-full bg-[linear-gradient(90deg,#29ab87,#f5a623)]" />
                  </h2>

                  <ul className="m-0 mt-6 list-none space-y-3 p-0">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.label}-${link.href}`}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 text-sm font-medium leading-6 text-white/60 no-underline transition hover:translate-x-0.5 hover:text-[#7edcc2]"
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
                <address key={address.title} className="tri-glass-card m-0 rounded-2xl p-5 not-italic">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[linear-gradient(160deg,#29ab87,#117a4b)] text-white shadow-md shadow-[rgba(41,171,135,0.35)]">
                      <MapPin className="size-4" />
                    </span>
                    <h2 className="m-0 text-[15px] font-semibold uppercase leading-6 tracking-[0.06em] text-white">
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

              <div className="tri-glass-card rounded-2xl p-5 sm:col-span-2">
                <h2 className="m-0 text-sm font-semibold text-white">Talk to our team</h2>

                <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href={`mailto:${footer.contact.email}`}
                    className="tri-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[rgba(41,171,135,0.4)] bg-[rgba(41,171,135,0.12)] px-4 py-2 text-sm font-semibold !text-[#7edcc2] no-underline transition hover:border-[rgba(41,171,135,0.7)] hover:bg-[rgba(41,171,135,0.2)] sm:w-fit"
                  >
                    <Mail className="size-4" />
                    {footer.contact.email}
                  </a>
                  {footer.contact.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="tri-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[rgba(245,166,35,0.35)] bg-[rgba(245,166,35,0.1)] px-4 py-2 text-sm font-semibold !text-[#f5a623] no-underline transition hover:border-[rgba(245,166,35,0.65)] hover:bg-[rgba(245,166,35,0.18)] sm:w-fit"
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

        <div className="border-y border-white/10 bg-white/[0.03]">
          <Container className="py-5">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                {footer.badges.map((badge) => (
                  <div
                    key={badge.src}
                    className="flex min-h-16 min-w-32 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2"
                  >
                    <Image
                      src={badge.src}
                      alt={badge.label}
                      width={badge.width}
                      height={badge.height}
                      className="h-auto max-h-12 w-auto max-w-32 object-contain sm:max-h-14"
                      style={{ width: "auto", height: "auto" }}
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
                      className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 no-underline transition hover:-translate-y-0.5 hover:border-[rgba(41,171,135,0.6)] hover:bg-[linear-gradient(160deg,#29ab87,#117a4b)] hover:text-white hover:shadow-lg hover:shadow-[rgba(41,171,135,0.4)]"
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
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="m-0 text-sm leading-6 text-white/50">
              Copyright &copy; Trijotech Software Consulting Pvt. Ltd. {currentYear}. All rights
              reserved.
            </p>
            <Link
              href="/privacy-policy"
              className="text-xs font-medium text-white/40 no-underline transition hover:text-[#7edcc2]"
            >
              Privacy Policy
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
