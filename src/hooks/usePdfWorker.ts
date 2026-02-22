import { useCallback, useEffect, useRef } from "react";
import type { Language } from "../utils/cvGenerator";

type WorkerResponse =
  | { type: "success"; buffer: ArrayBuffer; fileName: string }
  | { type: "error"; message: string };

export function usePdfWorker() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const generateAndDownload = useCallback((language: Language): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        workerRef.current = new Worker(
          new URL("../workers/pdf.worker.ts", import.meta.url),
          { type: "module" }
        );
      }

      const worker = workerRef.current;

      worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
        if (e.data.type === "success") {
          const blob = new Blob([e.data.buffer], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = e.data.fileName;
          a.click();
          URL.revokeObjectURL(url);
          resolve();
        } else {
          reject(new Error(e.data.message));
        }
      };

      worker.onerror = (e) => reject(new Error(e.message));
      worker.postMessage({ language });
    });
  }, []);

  return { generateAndDownload };
}
