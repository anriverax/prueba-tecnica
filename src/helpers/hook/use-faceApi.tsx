import { useCallback, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { useDetectionImageFormStore } from "./use.detect-store";
import { Spinner } from "@nextui-org/react";
import { FaceApiResult } from "../types";

/**
 * Custom hook for integrating face-api.js functionalities.
 *
 * @returns An object containing the compareFaces function.
 */
const useFaceApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<{ color: string; message: string }>({ color: "blue", message: "" });
  const { updateDetectedImages, detectedImages } = useDetectionImageFormStore();

  /**
   * Loads the necessary face-api.js models from the specified URL.
   */
  const loadModels = async () => {
    try {
      const MODEL_URL = "/models";

      // Load models in parallel for performance optimization
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]);

      console.log("Face-api.js models loaded successfully.");
    } catch (error) {
      console.error("Error loading face-api.js models:", error);
    }
  };

  const detectFaces = async (image: File[]) => {
    // Array to hold detection results from dwelling images
    const detectionImg: FaceApiResult[] = [];
    setIsLoading(true);
    // Validate that both dwelling images and captured image are available
    if (!image || image.length === 0) {
      setMsg({ color: "danger", message: "No hay imágenes disponibles para comparar." });
      return;
    }

    // Iterate over each dwelling image and detect faces
    for (const imgBlob of image) {
      try {
        const img2 = await faceapi.bufferToImage(imgBlob);

        const detections: FaceApiResult = await faceapi
          .detectSingleFace(img2, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detections) detectionImg.push(detections);
      } catch (error) {
        setIsLoading(false);
        console.error("Error processing dwelling image:", error);
      }
    }

    if (detectionImg.length > 0) {
      updateDetectedImages(detectionImg);
      setMsg({ color: "primary-400", message: "Se ha detectado un rostro en una de las imágenes." });
    } else setMsg({ color: "danger", message: "No se detecta ningún rostro en las imágenes." });

    setIsLoading(false);
  };

  /* eslint-disable */
  const compareFaces = async (capturedImage: any) => {
    const isMatch: boolean[] = [];
    try {
      // Convert the captured image buffer to an HTMLImageElement
      const img1 = await faceapi.bufferToImage(capturedImage);
      // Detect face in the captured image
      const detections1 = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor();

      if (!detections1) {
        setMsg({ color: "danger", message: "No se detecta ningún rostro en la selfie." });
        setIsLoading(false);
        return;
      }

      if (detectedImages.length > 0) {
        // Compare the captured face with each dwelling face
        detectedImages.forEach((detection: FaceApiResult) => {
          if (detection) {
            const distance = faceapi.euclideanDistance(detection.descriptor, detections1.descriptor);
            isMatch.push(distance < 0.6 ? true : false);
          }
        });

        if (isMatch.length)
          setMsg({
            color: "primary-400",
            message: "Los rostros de los documentos subidos con la selfie coinciden"
          });
        else setMsg({ color: "danger", message: "Los rostros no coinciden" });

        setIsLoading(false);
      } else {
        setIsLoading(false);
        setMsg({
          color: "danger",
          message:
            "Error inesperado: No se detectaron rostros en las imágenes subidas. Por favor, asegúrate de que las imágenes sean claras y de alta calidad"
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during face comparison:", error);
    }
  };

  const detectFaceApiStatus = useCallback(() => {
    if (isLoading) {
      return <Spinner size="sm" color="primary" />;
    }

    if (msg.message !== "") {
      return <div className={`text-tiny text-${msg.color} p-1 font-semibold"`}>{msg.message}</div>;
    }
  }, [isLoading, msg]);

  /* eslint-enable */
  useEffect(() => {
    void (async () => await loadModels())();
  }, []);

  return { detectFaces, compareFaces, isLoading, setIsLoading, msg, detectFaceApiStatus };
};

export { useFaceApi };
