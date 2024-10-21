// import { baseUrl } from "../ApiCalls/Endpoints";

// export const fetchVenuesWithApiKey = async (accessToken: string) => {
//   const apiKey = import.meta.env.VITE_API_KEY; // Access the API key from .env

//   const headers = {
//     Authorization: `Bearer ${accessToken}`, // User's access token
//     "X-Noroff-API-Key": apiKey, // API Key from .env
//     "Content-Type": "application/json",
//   };

//   try {
//     const response = await fetch(`${baseUrl}/holidaze/venues`, {
//       method: "GET",
//       headers: headers,
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data; // return the venues data
//   } catch (error) {
//     console.error("API Request Error:", error);
//     throw error;
//   }
// };
