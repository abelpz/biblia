import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function ArrowDownIcon({ color = 'black' }) {
  const svgMarkup = `
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="ArrowDownIcon">
        <path
          id="icon"
          d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z"
          fill="${color}"
        />
      </g>
    </svg>
  `;

  return <SvgXml xml={svgMarkup} />;
}