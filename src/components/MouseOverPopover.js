import { useState, useEffect } from 'react';

export default function MouseOverPopover() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX + 20, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed text-base z-30 italic" style={{ left: position.x, top: position.y }}>
      You must add an exercise to start your workout!
    </div>
  );
};
