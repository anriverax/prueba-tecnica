import React, { memo } from "react";
import Image from "next/image";

const DragActive = (): React.JSX.Element => (
  <React.Fragment>
    <div className="flex justify-center">
      <div>
        <Image
          src="/images/upload.png"
          alt="Icono para subir foto"
          width={54}
          height={54}
          className="m-auto"
        />

        <p className="text-sm my-3">Arrastrar aquí</p>
      </div>
    </div>
    <div className="flex items-center justify-center space-x-2">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="text-gray-500">o</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
    <div className="p-2 border-default-200 border bg-default-100 rounded-medium font-semibold text-sm my-3">
      Seleccionar archivo
    </div>
  </React.Fragment>
);

export default memo(DragActive);
