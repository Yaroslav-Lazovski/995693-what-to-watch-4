import React from "react";

const Preloader = () => {
  const preloaderStyle = {
    margin: `0 auto`,
    width: `200px`,
    height: `200px`
  };

  return (
    <div style={preloaderStyle}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 50a40 40 0 0080 0 40 42 0 01-80 0"
          fill="#c9b37e"
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            type="rotate"
            values="0 50 51;360 50 51"
          />
        </path>
      </svg>
    </div>
  );
};

export default Preloader;
