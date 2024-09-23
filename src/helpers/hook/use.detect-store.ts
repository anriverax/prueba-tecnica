/**
 * @file use-store.ts
 * @description This file defines a Zustand store for managing form data and actions.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FaceApiResult } from "../types";

/**
 * Interface representing the structure of form data.
 */

interface DetectionImageData {
  detectedImages: FaceApiResult[];
}

/**
 * Interface representing the actions that can be performed on the form data.
 */
interface DetectionImageActions {
  /**
   * Actualiza las imágenes detectadas con nuevas imágenes.
   * @param images - Array de nuevos archivos de imágenes detectadas.
   */
  updateDetectedImages: (images: FaceApiResult[]) => void;

  /**
   * Resetea las imágenes detectadas a su estado inicial.
   */
  resetDetectedImages: () => void;
}

/** Type representing the entire form store, combining form data and actions. */
type DetectionImageStore = DetectionImageData & DetectionImageActions;

/** The initial state of the form store. */
const initialState: DetectionImageData = {
  detectedImages: []
};

/**
 * A Zustand store hook for managing form data and actions.
 * This store is persisted in local storage.
 */
export const useDetectionImageFormStore = create<DetectionImageStore>()(
  persist(
    (set) => ({
      ...initialState,
      updateDetectedImages: (images: FaceApiResult[]) =>
        set((state) => ({
          detectedImages: [...state.detectedImages, ...images]
        })),
      resetDetectedImages: () =>
        set(() => ({
          ...initialState
        }))
    }),
    {
      name: "detection-image-storage"
    }
  )
);
