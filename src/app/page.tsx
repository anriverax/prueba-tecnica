"use client";

import React, { useEffect, useState } from "react";
import { Button, Chip, Switch } from "@nextui-org/react";
import {
  Code,
  Database,
  FileText,
  Layout,
  List,
  Send,
  Server,
  Shield,
  Smartphone,
  User
} from "lucide-react";
import { MoonIcon, SunIcon } from "./_partials/icons";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen space-y-12 transition-colors  duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-purple-100 to-indigo-200"} p-8`}
    >
      {/* React Developer Technical Test */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-2xl font-bold text-center text-purple-800 dark:text-purple-400 animate-fade-in">
            Prueba Técnica React Developer
          </h1>
        </div>
        <div className="flex justify-center items-center space-x-2 dark:text-gray-300">
          <Switch
            size="lg"
            color="success"
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
            onValueChange={setDarkMode}
          >
            Modo oscuro
          </Switch>
        </div>
      </div>
      {/* Frontend React - Development of a responsive web application */}
      <div className="bg-white p-4 rounded-lg shadow my-8 dark:bg-gray-800">
        <div className="flex gap-3 items-center mb-3">
          <Layout className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="font-semibold">Frontend React - Desarrollo de una aplicación web responsive</h2>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center gap-3">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              Formulario de registro con campos personales (nombres, apellidos, correo, teléfono,
              identificación, ubicación, ingresos)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Validaciones de campos obligatorios y tipos de datos</span>
          </li>
          <li className="flex items-center gap-3">
            <Smartphone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              Carga de fotografías y selfie con detección de rostros (arrastrar, explorador de archivos,
              cámara del dispositivo)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <List className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <span>
              Vista de registros con detalles e imágenes, diseño responsivo según Figma Proyecto Samla
            </span>
          </li>
        </ul>
      </div>
      {/* Backend with Node and Express - Services and data storage */}
      <div className="bg-white p-4 rounded-lg shadow mb-8 dark:bg-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <Server className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="font-semibold">
            Backend con Node y Express - Servicios y almacenamiento de datos
          </h2>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center gap-3">
            <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
            <span>Desarrollo de servicios necesarios para el funcionamiento de la aplicación web</span>
          </li>
          <li className="flex items-center gap-3">
            <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
            <span>Almacenamiento de registros en una base de datos no relacional</span>
          </li>
          <li className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
            <span>Implementación de estrategia de seguridad para utilizar el API</span>
          </li>
          <li className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
            <span>Implementación de estrategia de logs</span>
          </li>
        </ul>
      </div>
      {/* Delivery Method - Delivery Requirements */}
      <div className="bg-white p-4 rounded-lg shadow mb-8 dark:bg-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <Send className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="font-semibold">Forma de Entrega - Requisitos de entrega</h2>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center gap-3">
            <Chip
              variant="bordered"
              classNames={{
                base: "bg-white"
              }}
            >
              Repositorio Git
            </Chip>
            <span>o archivos comprimidos con el código fuente</span>
          </li>
          <li className="flex items-center gap-3">
            <Chip
              variant="bordered"
              classNames={{
                base: "bg-white"
              }}
            >
              Documentación
            </Chip>
            <span>para ejecutar la aplicación localmente</span>
          </li>
          <li className="flex items-center gap-3">
            <Chip
              variant="bordered"
              classNames={{
                base: "bg-white"
              }}
            >
              Despliegue
            </Chip>
            <span>en plataforma como Vercel, Netlify o similar</span>
          </li>
          <li className="flex items-center gap-3">
            <Chip
              variant="bordered"
              classNames={{
                base: "bg-white"
              }}
            >
              Demo
            </Chip>
            <span>y explicación de lo realizado</span>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <Button
          as={Link}
          href="/usuario/registrar"
          className="bg-[rgba(255,92,0,1)] text-white rounded-md text-base w-40"
        >
          Ver demo
        </Button>
      </div>
    </div>
  );
}
