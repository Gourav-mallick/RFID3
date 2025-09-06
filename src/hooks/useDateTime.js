import { useState, useEffect } from "react";

export default function useDateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, []);

  const date = dateTime.toLocaleDateString();  // e.g. 05/09/2025
  const time = dateTime.toLocaleTimeString();  // e.g. 10:42:15 AM

  return { date, time };
}
