import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const initial = expiryDate - Date.now();
    return initial > 0 ? initial : 0;
  });

  useEffect(() => {
    if (!expiryDate) return;

    const intervalId = setInterval(() => {
      const remaining = expiryDate - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  if (!expiryDate || timeLeft <= 0) return null;

  const totalSeconds = Math.floor(timeLeft / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <>
      {hours}h {minutes}m {seconds}s
    </>
  );
};

export default Countdown;
