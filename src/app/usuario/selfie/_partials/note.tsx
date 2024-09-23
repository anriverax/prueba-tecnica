import React, { memo } from "react";

const Note = (): React.JSX.Element => (
  <div className="flex items-start bg-white p-4 rounded-lg shadow mt-5">
    <svg
      className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 7a2 2 0 012-2h3.5a1.5 1.5 0 011.06.44l1.94 1.94A1.5 1.5 0 0012 7.5V5a2 2 0 012-2h3a2 2 0 012 2v14a2 2 0 01-2 2h-3a2 2 0 01-2-2v-2.5a1.5 1.5 0 00-1.06-.44l-1.94 1.94A1.5 1.5 0 0012 19.5H5a2 2 0 01-2-2V7z"
      />
    </svg>
    <div className="ml-4">
      <p className="text-gray-600">
        Asegúrate de que la imagen tenga una alta resolución, buena iluminación y esté enfocada.
      </p>
      <p className="text-gray-600 mt-2">
        Evita imágenes opacas o con baja claridad, ya que pueden dificultar el reconocimiento facial.
      </p>
    </div>
  </div>
);

export default memo(Note);
