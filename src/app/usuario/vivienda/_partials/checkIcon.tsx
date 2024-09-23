import React, { memo } from "react";

const CheckIcon = (): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    className="absolute top-2 right-2 text-white font-semibold bg-green-500 rounded-2xl"
  >
    <path fill="none" stroke="currentColor" strokeWidth="2" d="M4 12l6 6L20 6" />
  </svg>
);

export default memo(CheckIcon);
