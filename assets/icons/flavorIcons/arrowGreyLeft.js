import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function ArrowLeftGreyIcon({ color = 'black' }) {
  const svgMarkup = `
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon">
        <path
          id="Vector"
          d="M15 6.70498C14.61 6.31498 13.98 6.31498 13.59 6.70498L9.00002 11.295C8.61002 11.685 8.61002 12.315 9.00002 12.705L13.59 17.295C13.98 17.685 14.61 17.685 15 17.295C15.39 16.905 15.39 16.275 15 15.885L11.12 11.995L15 8.11498C15.39 7.72498 15.38 7.08498 15 6.70498Z"
          fill="${color}"
        />
      </g>
    </svg>
  `;

  return <SvgXml xml={svgMarkup} />;
}
