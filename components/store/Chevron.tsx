import React from 'react'
import { useLayoutEffect, useRef } from 'react'

const Chevron = ({ store }: any) => {
  const chevronRef = useRef<any>(null)
  // animate the chevron to indicate press to scroll down
  useLayoutEffect(() => {
    const chevron = chevronRef.current;
    const animate = () => {
      chevron.style.transform = "translateY(10px)";
      chevron.style.transition = "transform 0.5s ease-in-out";
      setTimeout(() => {
        chevron.style.transform = "translateY(0px)";
        chevron.style.transition = "transform 0.5s ease-in-out";
      }, 500);
    };
    animate();
    const interval = setInterval(animate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <a
      href="#products"
      className={`${store.is_simple_virtual_visit ? "hidden" : "block"
        }`}
    >
      <svg
        ref={chevronRef}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="xl:hidden w-32 h-16 text-gray-300 absolute bottom-16 mx-auto z-10 left-0 right-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </a>
  )
}

export default Chevron
