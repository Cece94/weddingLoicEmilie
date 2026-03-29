"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { navRoutes, type NavKey } from "@/lib/navigation";

const navOrder: NavKey[] = [
  "ourWedding",
  "accommodationFood",
  "registration",
  "travel",
  "program",
  "faq",
];

export function MobileMenu() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const menuOverlay = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          exit={prefersReducedMotion ? {} : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-background/95 p-6 lg:hidden"
        >
          <div className="mx-auto flex max-w-4xl flex-col">
            <div className="mb-8 flex items-center justify-between border-b border-line pb-5">
              <p className="text-sm uppercase tracking-[0.25em] text-muted">{t("menu")}</p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-surface"
                aria-label={t("mobileMenuClose")}
              >
                <X size={18} />
              </button>
            </div>

            <nav aria-label={t("menu")}>
              <ul className="space-y-4">
                {navOrder.map((key) => {
                  const href = `/${locale}${navRoutes[key]}`;
                  const active = pathname === href;

                  return (
                    <li key={key}>
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={`block rounded-xl border px-4 py-4 text-sm uppercase tracking-[0.16em] ${
                          active
                            ? "border-foreground bg-foreground text-background"
                            : "border-line bg-surface text-foreground"
                        }`}
                      >
                        {t(`nav.${key}`)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Link
              href={`/${locale}/rsvp`}
              onClick={() => setIsOpen(false)}
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-accent bg-accent px-6 text-sm font-semibold tracking-wide text-background"
            >
              {t("rsvp")}
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-surface text-foreground lg:hidden"
        aria-label={t("mobileMenuOpen")}
      >
        <Menu size={18} />
      </button>

      {/* Render on body to avoid fixed-position issues from blurred header. */}
      {isMounted ? createPortal(menuOverlay, document.body) : null}
    </>
  );
}
