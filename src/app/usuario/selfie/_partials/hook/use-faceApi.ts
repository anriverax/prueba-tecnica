import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { useFormStore } from "#/helpers/hook/use-store";

/**
 * Custom hook for integrating face-api.js functionalities.
 *
 * @returns An object containing the compareFaces function.
 */
const useFaceApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dwelling } = useFormStore();

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

  /* eslint-disable */
  const compareFaces = async (capturedImage: any) => {
    // Array to hold detection results from dwelling images

    const detectionData: any[] = [];

    // Validate that both dwelling images and captured image are available
    if (!dwelling.image || dwelling.image.length === 0) {
      console.warn("No dwelling images available for comparison.");
      return;
    }

    try {
      // Convert the captured image buffer to an HTMLImageElement
      const img1 = await faceapi.bufferToImage(capturedImage);
      // Detect face in the captured image
      const detections1 = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor();

      if (!detections1) {
        console.log("No face detected in the captured image.");
        return;
      }

      // Iterate over each dwelling image and detect faces
      for (const imgBlob of dwelling.image) {
        try {
          const img2 = await faceapi.bufferToImage(imgBlob);
          console.log(img2);
          const detections = await faceapi
            .detectSingleFace(img2, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (detections) {
            detectionData.push(detections);
          } else {
            setIsLoading(false);
            console.log("No face detected in one of the dwelling images.");
          }
        } catch (error) {
          setIsLoading(false);
          console.error("Error processing dwelling image:", error);
        }
      }
      console.log("Detection Data:", detectionData);

      if (detectionData.length > 0) {
        // Compare the captured face with each dwelling face
        detectionData.forEach((detection, index) => {
          const distance = faceapi.euclideanDistance(detection.descriptor, detections1.descriptor);
          const isMatch = distance < 0.6; // Threshold can be adjusted based on requirements
          console.log(
            `Comparison with dwelling image ${index + 1}: ${
              isMatch ? "Faces match!" : "Faces do not match."
            } (Distance: ${distance.toFixed(4)})`
          );
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
        console.log("No faces detected in any of the dwelling images.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during face comparison:", error);
    }
  };
  /* eslint-enable */
  useEffect(() => {
    void (async () => await loadModels())();
  }, []);

  return { compareFaces, isLoading, setIsLoading };
};

export { useFaceApi };
