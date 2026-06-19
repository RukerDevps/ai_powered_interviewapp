import OpenAI from "openai";

interface KimiConfig {
  apiKey: string;
  baseURL: string;
  model: string;
}

export class KimiServiceError extends Error {
  status: number | null;
  retryable: boolean;

  constructor(message: string, status: number | null) {
    super(message);
    this.name = "KimiServiceError";
    this.status = status;
    this.retryable = status === 429 || status === 503 || status === 504;
  }
}

const getErrorRecord = (error: unknown): Record<string, unknown> | null =>
  error && typeof error === "object" && !Array.isArray(error)
    ? (error as Record<string, unknown>)
    : null;

const getErrorStatus = (error: unknown) => {
  const record = getErrorRecord(error);
  const status = record?.status;

  return typeof status === "number" ? status : null;
};

const getProviderMessage = (error: unknown) => {
  const record = getErrorRecord(error);
  const nestedError = getErrorRecord(record?.error);
  const metadata = getErrorRecord(nestedError?.metadata);

  if (typeof metadata?.raw === "string") {
    return metadata.raw;
  }

  if (typeof nestedError?.message === "string") {
    return nestedError.message;
  }

  return error instanceof Error ? error.message : "The AI provider returned an error.";
};

const normalizeKimiError = (error: unknown) => {
  const status = getErrorStatus(error);

  if (status === 429) {
    return new KimiServiceError(
      "The AI provider is temporarily rate-limited. Please wait a minute and submit your answer again.",
      status
    );
  }

  if (status && status >= 500) {
    return new KimiServiceError(
      "The AI provider is temporarily unavailable. Please try again shortly.",
      status
    );
  }

  return new KimiServiceError(getProviderMessage(error), status);
};

export function getKimiConfig(): KimiConfig {
  const apiKey = process.env.KIMI_API_KEY;
  const baseURL = process.env.KIMI_BASE_URL;
  const model = process.env.KIMI_MODEL;

  if (!apiKey || !baseURL || !model) {
    throw new Error("Kimi is not configured. Set KIMI_API_KEY, KIMI_BASE_URL, and KIMI_MODEL.");
  }

  return { apiKey, baseURL, model };
}

export function getKimiClient() {
  const { apiKey, baseURL } = getKimiConfig();

  return new OpenAI({
    apiKey,
    baseURL,
  });
}

export async function createKimiJsonCompletion({
  system,
  user,
  temperature,
}: {
  system: string;
  user: string;
  temperature: number;
}) {
  const { model } = getKimiConfig();
  const client = getKimiClient();

  const response = await client.chat.completions
    .create({
      model,
      temperature,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    })
    .catch((error: unknown) => {
      throw normalizeKimiError(error);
    });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Kimi returned an empty response.");
  }

  return content;
}
