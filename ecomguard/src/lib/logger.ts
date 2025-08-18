export function logInfo(message: string, meta?: unknown) {
  console.log(`[info] ${message}`, meta ?? "");
}

export function logError(message: string, meta?: unknown) {
  console.error(`[error] ${message}`, meta ?? "");
}

