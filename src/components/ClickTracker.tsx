import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

const EXCLUDED_PREFIXES = ["/admin", "/auth"];

const labelFor = (el: HTMLElement): string => {
  const explicit =
    el.getAttribute("data-track") ||
    el.getAttribute("aria-label") ||
    el.getAttribute("title");
  if (explicit) return explicit.trim().slice(0, 120);

  const text = (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ");
  if (text) return text.slice(0, 120);

  if (el instanceof HTMLAnchorElement && el.href) return el.href.slice(0, 120);
  return "(unlabeled)";
};

export const ClickTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const trigger = target.closest<HTMLElement>(
        'a, button, [role="button"], [data-track]',
      );
      if (!trigger) return;
      // ignore the SL stats button itself
      if (trigger.getAttribute("aria-label") === "Storage Locker stats") return;

      const label = labelFor(trigger);
      const href =
        trigger instanceof HTMLAnchorElement ? trigger.href : undefined;

      trackEvent("click", href ? `${label} → ${href}` : label);
    };

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true } as any);
  }, [pathname]);

  return null;
};
