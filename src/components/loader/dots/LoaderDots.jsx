import { useState, useEffect, useRef } from "react";
import "./LoaderDots.css";

const LoaderDots = ({ isSaving }) => {
  const [viewDots, setViewDots] = useState(".");
  const intervalId = useRef();

  useEffect(() => {
    if (isSaving) {
      let count = 1;
      const dots = ".";
      intervalId.current = setInterval(() => {
        const copyDots = count > 6 ? "." : `${dots.repeat(count)}.`;
        count = count > 6 ? 1 : count + 1;
        setViewDots(copyDots);
      }, 200);
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [isSaving]);

  return <div className="lod-dots">{viewDots}</div>;
};

export default LoaderDots;
