export async function fetchJSON<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Fetch failed with status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}
