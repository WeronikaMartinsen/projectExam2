import { baseUrl, loginUrl } from "../Endpoints";
import { load, save } from "../../storage/localStorage";

export async function login(user) {
  const loginURL = baseUrl + loginUrl;

  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(loginURL, postData);
    const json = await response.json();

    if (response.ok) {
      const accessToken = json.data.accessToken;
      if (!accessToken) {
        console.error("Access token not found in response:", json);
        throw new Error("Access token not found in response");
      }
      save("token", accessToken);
      console.log("Access token saved successfully:", accessToken);
      save("profile", {
        userName: json.data.name,
        userEmail: json.data.email,
        userAvatar: json.data.avatar,
      });

      return accessToken;
    } else {
      const status = json.statusCode;
      if (status === 401) {
        //add user error feedback
      } else {
        throw new Error(`Login failed with status ${status}.`);
      }
    }
  } catch (error) {
    // Log any unexpected errors that occur during login
    console.error("An unexpected error occurred:", error);
    //add user feedback
  }
}
