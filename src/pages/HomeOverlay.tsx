import { useEffect } from "react";
import { StatsButton } from "@/components/funnel/StatsButton";
import { trackEvent } from "@/lib/analytics";

const HomeOverlay = () => {
  useEffect(() => {
    trackEvent("visit");
  }, []);

  return <StatsButton />;
};

export default HomeOverlay;
