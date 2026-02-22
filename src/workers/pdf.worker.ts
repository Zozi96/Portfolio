import type { Language, CVResult } from "../utils/cvGenerator";

interface WorkerRequest {
  language: Language;
}

type WorkerResponse =
  | { type: "success"; buffer: ArrayBuffer; fileName: string }
  | { type: "error"; message: string };

self.addEventListener("message", async (event: MessageEvent<WorkerRequest>) => {
  try {
    const { generateCV } = await import("../utils/cvGenerator");
    const result: CVResult = await generateCV({ language: event.data.language });
    const response: WorkerResponse = {
      type: "success",
      buffer: result.buffer,
      fileName: result.fileName,
    };
    self.postMessage(response, { transfer: [result.buffer] });
  } catch (err) {
    const response: WorkerResponse = {
      type: "error",
      message: err instanceof Error ? err.message : String(err),
    };
    self.postMessage(response);
  }
});
