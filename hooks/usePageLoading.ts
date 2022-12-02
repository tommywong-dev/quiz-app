import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePageLoading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
  };
  const handleStop = () => setLoading(false);

  useEffect(() => {
    router.events.on("routeChangeStart", handleLoad);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading;
};
