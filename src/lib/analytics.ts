import { supabase } from "@/integrations/supabase/client";

export const trackEvent = async (
  event_type: "visit" | "click",
  label?: string,
) => {
  try {
    await supabase.from("page_events").insert({
      event_type,
      label: label ?? null,
      path: typeof window !== "undefined" ? window.location.pathname : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });
  } catch (e) {
    // swallow — analytics must never break UX
    console.warn("analytics failed", e);
  }
};
