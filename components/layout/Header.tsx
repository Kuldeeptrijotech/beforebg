"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, Search, UserCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import headerData from "@/lib/header-data.json";

type HeaderDropdownItem = {
  name: string;
  href: string;
  description: string;
  hasImage: boolean;
  imageUrl: string;
};

type HeaderNavItem = {
  name: string;
  type: "link" | "dropdown";
  href: string;
  description: string;
  items?: HeaderDropdownItem[];
};

function isActiveRoute(pathname: string, href: string) {
  if (!href) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isNavItemActive(pathname: string, item: HeaderNavItem) {
  if (isActiveRoute(pathname, item.href)) {
    return true;
  }

  return item.items?.some((child) => isActiveRoute(pathname, child.href)) ?? false;
}

function hasDropdownItems(item: HeaderNavItem) {
  return Boolean(item.items?.length);
}

function getFirstDropdownItem(item: HeaderNavItem) {
  return item.items?.[0] ?? null;
}

function getDropdownItemByHref(item: HeaderNavItem, href?: string) {
  return item.items?.find((dropdownItem) => dropdownItem.href === href) ?? null;
}

function HeaderActionButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownName, setOpenDropdownName] = useState<string | null>(null);
  const [openMobileDropdownName, setOpenMobileDropdownName] = useState<
    string | null
  >(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItemByMenu, setActiveItemByMenu] = useState<
    Record<string, string>
  >({});

  const { brand } = headerData;
  const configuredNavItems = headerData.navItems as HeaderNavItem[];
  const servicesItem = configuredNavItems.find((item) => item.name === "Services");
  const navItems = servicesItem
    ? configuredNavItems.reduce<HeaderNavItem[]>((items, item) => {
        if (item.name === "Services") return items;
        if (item.name === "Solutions") items.push(servicesItem);
        items.push(item);
        return items;
      }, [])
    : configuredNavItems;

  function openDropdown(item: HeaderNavItem) {
    const firstItem = getFirstDropdownItem(item);

    setOpenDropdownName(item.name);
    if (firstItem && !activeItemByMenu[item.name]) {
      setActiveItemByMenu((current) => ({
        ...current,
        [item.name]: firstItem.href,
      }));
    }
  }

  function toggleDropdown(item: HeaderNavItem) {
    if (openDropdownName === item.name) {
      setOpenDropdownName(null);
      return;
    }

    openDropdown(item);
  }

  function getActiveDropdownItem(item: HeaderNavItem) {
    return (
      getDropdownItemByHref(item, activeItemByMenu[item.name]) ??
      getFirstDropdownItem(item)
    );
  }

  function setActiveDropdownItem(menuName: string, itemHref: string) {
    setActiveItemByMenu((current) => ({
      ...current,
      [menuName]: itemHref,
    }));
  }

  function openSearch() {
    setIsSearchOpen(true);
    setIsMenuOpen(false);
    setOpenDropdownName(null);
    setOpenMobileDropdownName(null);
  }

  function closeSearch() {
    setIsSearchOpen(false);
    setSearchQuery("");
  }

  return (
    <header className="site-modern-header sticky top-0 z-50 bg-[#030713] font-sans text-white">
      <div className="relative border-b border-white/10 bg-[#050817]/95 backdrop-blur-xl">
        <div className="site-header-grid mx-auto grid h-18 grid-cols-[1fr_auto] items-center gap-4 px-3 sm:px-4 xl:grid-cols-[1fr_auto_1fr] xl:px-6">
          <Link
            href={brand.homeHref}
            className="flex w-fit items-center"
            aria-label={brand.ariaLabel}
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src={brand.logoSrc}
              alt={brand.logoAlt}
              width={180}
              height={48}
              priority
              className="h-11 w-auto"
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="site-primary-nav hidden items-center gap-1 rounded-full border border-white/10 bg-white/6 p-1 shadow-lg shadow-black/20 xl:flex"
          >
            {navItems.map((item) => {
              const isActive = isNavItemActive(pathname, item);
              const hasDropdown = hasDropdownItems(item);
              const parentNavigates = item.name !== "Solutions" && Boolean(item.href);
              const isDropdownOpen = openDropdownName === item.name;
              const activeDropdownItem = getActiveDropdownItem(item);
              const navLinkClasses = `inline-flex h-8 items-center gap-1 rounded-full px-4 text-sm font-semibold transition ${isActive
                ? "bg-white/15 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white"
                }`;

              if (hasDropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => openDropdown(item)}
                    onMouseLeave={() => setOpenDropdownName(null)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        setOpenDropdownName(null);
                      }
                    }}
                  >
                    <div className={`${navLinkClasses} gap-0 px-1`}>
                      {parentNavigates ? (
                        <Link href={item.href} className="flex h-full items-center rounded-full px-3">{item.name}</Link>
                      ) : (
                        <button type="button" onClick={() => toggleDropdown(item)} className="flex h-full items-center rounded-full px-3">{item.name}</button>
                      )}
                      <button
                        type="button"
                        className="flex h-full items-center rounded-full px-1.5"
                        aria-label={`Toggle ${item.name} menu`}
                        aria-haspopup="true"
                        aria-expanded={isDropdownOpen}
                        onClick={() => toggleDropdown(item)}
                      >
                        <ChevronDown
                        className={`h-3.5 w-3.5 text-white/45 transition ${isDropdownOpen ? "rotate-180 text-white/70" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isDropdownOpen ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          className="site-desktop-dropdown fixed left-1/2 top-13 hidden w-[min(760px,calc(100vw-2rem))] -translate-x-1/2 pt-3 xl:block"
                        >
                          <div className="grid min-h-80 grid-cols-[minmax(220px,0.9fr)_minmax(320px,1.1fr)] overflow-hidden rounded-lg border border-white/10 bg-[#111320]/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
                            <div className="border-r border-white/10 p-2">
                              {item.items?.map((dropdownItem) => {
                                const isSelected =
                                  activeDropdownItem?.href === dropdownItem.href;

                                return (
                                  <Link
                                    key={`${item.name}-${dropdownItem.name}-${dropdownItem.href}`}
                                    href={dropdownItem.href}
                                    onMouseEnter={() =>
                                      setActiveDropdownItem(
                                        item.name,
                                        dropdownItem.href,
                                      )
                                    }
                                    onFocus={() =>
                                      setActiveDropdownItem(
                                        item.name,
                                        dropdownItem.href,
                                      )
                                    }
                                    className={`group/item flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition focus-visible:outline-none ${isSelected
                                      ? "bg-white/12 text-white"
                                      : "text-white/70 hover:bg-white/7 hover:text-white focus-visible:bg-white/7 focus-visible:text-white"
                                      }`}
                                  >
                                    <span className="min-w-0 truncate">
                                      {dropdownItem.name}
                                    </span>
                                    <ChevronRight
                                      className={`h-4 w-4 shrink-0 transition ${isSelected
                                        ? "translate-x-0.5 text-cyan-200"
                                        : "text-white/25 group-hover/item:translate-x-0.5 group-hover/item:text-cyan-200"
                                        }`}
                                    />
                                  </Link>
                                );
                              })}
                            </div>

                            <div className="flex flex-col p-5">
                              <AnimatePresence mode="wait">
                                {activeDropdownItem ? (
                                  <motion.div
                                    key={activeDropdownItem.href}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.14, ease: "easeOut" }}
                                    className="flex h-full flex-col"
                                  >
                                    <div
                                      className="min-h-30 overflow-hidden rounded-lg border border-white/10 bg-white/5 bg-cover bg-center"
                                      style={
                                        activeDropdownItem.hasImage &&
                                          activeDropdownItem.imageUrl
                                          ? {
                                            backgroundImage: `url(${activeDropdownItem.imageUrl})`,
                                          }
                                          : undefined
                                      }
                                    >
                                      {!activeDropdownItem.hasImage ||
                                        !activeDropdownItem.imageUrl ? (
                                        <div className="flex min-h-30 items-center justify-center bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(255,255,255,0.06))]">
                                          <span className="text-5xl font-bold text-white/20">
                                            {activeDropdownItem.name.charAt(0)}
                                          </span>
                                        </div>
                                      ) : null}
                                    </div>

                                    <div className="mt-2">
                                      <p className="text-base font-semibold text-white">
                                        {activeDropdownItem.name}
                                      </p>
                                      <p className="mt-2 text-sm leading-6 text-white/55">
                                        {activeDropdownItem.description ||
                                          item.description}
                                      </p>
                                    </div>

                                    <Link
                                      href={activeDropdownItem.href}
                                      className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 py-1.5 text-sm font-semibold text-white/80 transition hover:border-cyan-300/30 hover:bg-white/10 hover:text-white"
                                    >
                                      Know More
                                      <ChevronRight className="h-4 w-4" />
                                    </Link>
                                  </motion.div>
                                ) : null}
                              </AnimatePresence>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link key={item.name} href={item.href} className={navLinkClasses}>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="site-header-actions hidden items-center justify-end gap-2 xl:flex">
            <HeaderActionButton label="Search" onClick={openSearch}>
              <Search className="h-4.5 w-4.5" />
            </HeaderActionButton>
            <Link
              href="/admin/login"
              aria-label="Profile"
              title="Profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <UserCircle className="h-5 w-5" />
            </Link>
          </div>

          <button
            type="button"
            className="site-menu-toggle inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition hover:bg-white/10 xl:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isSearchOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-0 top-0 z-60 border-b border-white/10 bg-[#050817]/98 backdrop-blur-xl"
            >
              <div className="mx-auto grid h-18 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-2 sm:px-2 lg:px-6">
                <Link
                  href={brand.homeHref}
                  className="flex w-fit items-center"
                  aria-label={brand.ariaLabel}
                  onClick={closeSearch}
                >
                  <Image
                    src={brand.logoSrc}
                    alt={brand.logoAlt}
                    width={180}
                    height={48}
                    priority
                    className="h-11 w-auto"
                  />
                </Link>

                <div className="mx-auto flex h-11 w-full max-w-2xl items-center gap-3 rounded-full border border-white/10 bg-white/7 px-4">
                  <Search className="h-5 w-5 shrink-0 text-white/45" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        closeSearch();
                      }
                    }}
                    autoFocus
                    placeholder="Search Trijotech..."
                    className="h-full min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/35"
                  />
                </div>

                <button
                  type="button"
                  aria-label="Close search"
                  title="Close search"
                  onClick={closeSearch}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {isMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="site-mobile-panel max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-[#080b18] shadow-2xl shadow-black/40 xl:hidden"
            >
              <div className="px-4 py-5">
                <nav aria-label="Mobile navigation" className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = isNavItemActive(pathname, item);
                    const hasDropdown = hasDropdownItems(item);
                    const parentNavigates = item.name !== "Solutions" && Boolean(item.href);
                    const isMobileDropdownOpen =
                      openMobileDropdownName === item.name;

                    if (hasDropdown) {
                      return (
                        <div key={item.name}>
                          <div className={`flex w-full items-center justify-between rounded-lg text-sm font-semibold transition ${isActive
                              ? "bg-white/12 text-white"
                              : "text-white/75 hover:bg-white/[0.07] hover:text-white"
                              }`}>
                            {parentNavigates ? (
                              <Link href={item.href} onClick={() => setIsMenuOpen(false)} className="flex-1 px-4 py-3">{item.name}</Link>
                            ) : (
                              <button type="button" onClick={() => setOpenMobileDropdownName((current) => current === item.name ? null : item.name)} className="flex-1 px-4 py-3 text-left">{item.name}</button>
                            )}
                            <button
                              type="button"
                              onClick={() => setOpenMobileDropdownName((current) => current === item.name ? null : item.name)}
                              className="px-4 py-3"
                              aria-label={`Toggle ${item.name} menu`}
                              aria-expanded={isMobileDropdownOpen}
                            >
                              <ChevronDown
                              className={`h-4 w-4 text-white/30 transition ${isMobileDropdownOpen
                                ? "rotate-180 text-white/60"
                                : ""
                                }`}
                              />
                            </button>
                          </div>

                          <AnimatePresence initial={false}>
                            {isMobileDropdownOpen ? (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.16, ease: "easeOut" }}
                                className="ml-4 mt-1 overflow-hidden border-l border-white/10 pl-3"
                              >
                                <div className="space-y-1">
                                  {item.items?.map((dropdownItem) => (
                                    <Link
                                      key={`${item.name}-${dropdownItem.name}-${dropdownItem.href}`}
                                      href={dropdownItem.href}
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setOpenMobileDropdownName(null);
                                      }}
                                      className="block rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/[0.07] hover:text-white"
                                    >
                                      {dropdownItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition ${isActive
                          ? "bg-white/12 text-white"
                          : "text-white/75 hover:bg-white/[0.07] hover:text-white"
                          }`}
                      >
                        {item.name}
                        <ChevronRight className="h-4 w-4 text-white/30" />
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-4 flex gap-2 border-t border-white/10 pt-4">
                  <HeaderActionButton label="Search" onClick={openSearch}>
                    <Search className="h-4.5 w-4.5" />
                  </HeaderActionButton>
                  <Link
                    href="/admin/login"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Profile"
                    title="Profile"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    <UserCircle className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
