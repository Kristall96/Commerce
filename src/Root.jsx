import React, { useState, useEffect } from "react";
import App from "./App";
import Spinner from "./components/ui/Spinner";

const Root = () => {
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootstrapped(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return bootstrapped ? (
    <App />
  ) : (
    <Spinner fullscreen message="Starting app..." />
  );
};

export default Root;
