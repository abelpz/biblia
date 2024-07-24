import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function ArrowUpIcon({ color = 'black' }) {
  const svgMarkup = `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Trailing icon">
        <path id="icon" d="M5.25 10.5L9 6.75L12.75 10.5H5.25Z" fill="${color}"/>
      </g>
    </svg>
  `;

  return <SvgXml xml={svgMarkup} />;
}
