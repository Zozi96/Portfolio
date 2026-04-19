// Polyfill window for React Refresh during development
if (typeof window === "undefined") {
  self.window = self;
}

type Language = "en" | "es";

interface CVResult {
  buffer: ArrayBuffer;
  fileName: string;
}

interface WorkerRequest {
  language: Language;
}

type WorkerResponse =
  | { type: "success"; buffer: ArrayBuffer; fileName: string }
  | { type: "error"; message: string };

/**
 * Web Worker for PDF generation.
 * Handles heavy PDF generation logic off the main thread.
 */
self.addEventListener("message", async (event: MessageEvent<WorkerRequest>) => {
  try {
    const { language } = event.data;
    
    // Dynamically import to keep worker bundle small if needed
    const { generateCV } = await import("../utils/cvGenerator");
    
    const result: CVResult = await generateCV({ language });

    const response: WorkerResponse = {
      type: "success",
      buffer: result.buffer,
      fileName: result.fileName,
    };

    // Use transferable objects for performance
    self.postMessage(response, { transfer: [result.buffer] });
  } catch (err) {
    console.error("Worker PDF generation failed:", err);
    
    const response: WorkerResponse = {
      type: "error",
      message: err instanceof Error ? err.message : "Unknown error during PDF generation",
    };
    
    self.postMessage(response);
  }
});
