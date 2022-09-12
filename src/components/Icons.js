import React from "react";
import PropTypes from "prop-types";
export const Icons = ({ className, size, viewBox, color, title, path }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      height={size}
      width={size}
      fill={color}
    >
      <title>{title}</title>
      <path d={path} />
    </svg>
  );
};
Icons.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  size: PropTypes.number,
  viewBox: PropTypes.string,
  color: PropTypes.string,
};

Icons.defaultProps = {
  className: "weatherIcon",
  size: 25,
  viewBox: "0 -5 40 50",
  color: "#C0C0C0",
};
