import React from "react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { UserData } from "../util";

interface ModalCustomProps {
  user: UserData;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

const ModalCustom = (props: ModalCustomProps) => {
  const { user, isOpen, onOpenChange } = props;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
        <ModalBody>
          <div className="justify-center gap-6 md:flex md:justify-start">
            <div className="mb-6 w-full flex justify-center md:mb-0 md:block md:justify-start md:w-1/3">
              <div className="w-[214px] h-[288px] aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  as={NextImage}
                  src={user.selfie}
                  alt="Profile picture"
                  width={214}
                  height={288}
                  className="w-[214px] h-[288px] object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-center text-[20px] mb-5 font-semibold md:text-left">{`${user.names} ${user.surnames}`}</h2>
              <div className="w-full grid grid-cols-2 text-center gap-4 md:w-2/3 md:text-left">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Correo electrónico</h3>
                  <p>{user.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Departamento</h3>
                  <p>San Salvador</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Número de teléfono</h3>
                  <p>{user.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Municipio</h3>
                  <p>San Jacinto</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Tipo de documento</h3>
                  <p>{user.typeDocumentId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Dirección</h3>
                  <p>{user.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Número de documento</h3>
                  <p>{user.identificationNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Ingresos mensuales</h3>
                  <p>{`$ ${user.salary}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t-2">
            <h3 className="text-lg pt-5 font-semibold mb-2">Documento de identidad</h3>
            <div className="flex gap-4">
              {user.images.map((img: string, index: number) => (
                <div
                  key={index}
                  className="w-[214px] h-[133px] bg-gray-200 flex items-center justify-center rounded-lg"
                >
                  <Image
                    as={NextImage}
                    src={img}
                    alt={`document-${index}`}
                    width={214}
                    height={133}
                    className="w-[214px] h-[133px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalCustom;
