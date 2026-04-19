import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.location.replace("/site.html");
  }, []);
  return null;
};

export default Index;
