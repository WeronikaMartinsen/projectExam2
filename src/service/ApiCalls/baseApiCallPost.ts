export async function postRequest<T>(url: string, body: T): Promise<Response> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const message = `Error: ${response.statusText}`;
    throw new Error(message);
  }

  return response;
}
