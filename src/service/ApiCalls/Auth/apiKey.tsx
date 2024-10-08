import { baseUrl, apiKeyUrl } from "../Endpoints";
import { load } from "../../storage/localStorage";

export async function getApiKey() {
  const response = await fetch(baseUrl + apiKeyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${load("token")}`,
    },
    body: JSON.stringify({
      name: "Test",
    }),
  });

  if (response.ok) {
    return await response.json();
  }

  console.error(await response.json);
  throw new Error("Could not register for an API key!");
}
