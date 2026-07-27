export class StrapiClientError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "StrapiClientError";
  }
}

const DEFAULT_TIMEOUT_MS = 12_000;

function baseUrl(): string {
  const url = import.meta.env.VITE_STRAPI_URL as string | undefined;
  if (!url) {
    throw new StrapiClientError("VITE_STRAPI_URL is not configured");
  }
  return url.replace(/\/$/, "");
}

export async function strapiFetch<T>(
  path: string,
  init?: RequestInit & { timeoutMs?: number },
): Promise<T> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, ...rest } = init ?? {};
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${baseUrl()}${path}`, {
      ...rest,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(rest.headers ?? {}),
      },
    });

    if (!response.ok) {
      throw new StrapiClientError(
        `Strapi request failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    return (await response.json()) as T;
  } catch (err) {
    if (err instanceof StrapiClientError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new StrapiClientError("Strapi request timed out");
    }
    throw new StrapiClientError(
      err instanceof Error ? err.message : "Strapi request failed",
    );
  } finally {
    clearTimeout(timer);
  }
}
