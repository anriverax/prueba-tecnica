import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import React, { memo } from "react";

const Inication = (): React.JSX.Element => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <div className="flex items-center mb-5" onClick={onOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
        <p className="text-primary-400 font-bold cursor-pointer">Indicaciones</p>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="mx-4 lg:mx-0"
        scrollBehavior="inside"
        size="4xl"
      >
        <ModalContent>
          <ModalBody>
            <div className="max-w-5xl mx-auto p-6">
              <h1 className="text-2xl font-bold mb-6 text-center">Indicaciones para subir documentos</h1>
              <ul className="space-y-4">
                <li className="flex items-start bg-white p-4 rounded-lg shadow">
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
                    <h2 className="font-semibold">Calidad de la Imagen</h2>
                    <p className="text-gray-600">
                      Asegúrate de que la imagen tenga una alta resolución, buena iluminación y esté
                      enfocada.
                    </p>
                    <p className="text-gray-600 mt-2">
                      Evita imágenes opacas o con baja claridad, ya que pueden dificultar el
                      reconocimiento facial.
                    </p>
                  </div>
                </li>

                <li className="flex items-start bg-white p-4 rounded-lg shadow">
                  <svg
                    className="w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <div className="ml-4">
                    <h2 className="font-semibold">Formato y Tamaño del Archivo</h2>
                    <p className="text-gray-600">
                      Utiliza formatos como JPEG, PNG o PDF y asegúrate de que el tamaño no exceda los 5
                      MB.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default memo(Inication);
