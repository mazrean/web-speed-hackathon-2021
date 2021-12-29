import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} iconType
 * @property {'solid' | 'regular'} styleType
 */

/** @type {React.VFC<Props>} */
const FontAwesomeIcon = ({ iconType, styleType }) => {
  return (
    <svg className="font-awesome inline-block leading-none fill-current">
      <use xlinkHref={`/svgs/${styleType}/${iconType}.svg`} />
    </svg>
  );
};

export { FontAwesomeIcon };
