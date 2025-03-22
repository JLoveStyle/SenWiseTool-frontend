import { LOCAL_STORAGE } from "./storage";

export const Headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${LOCAL_STORAGE.get("token")}`,
};

console.log("\n\n token in storage: ", LOCAL_STORAGE.get("token"));
export default class ApiCall {
  async PATCH(url: string, body: any, _headers: HeadersInit = {}) {
    return fetch(url, {
      method: "PATCH",
      headers: { ...Headers, ..._headers },
      body: JSON.stringify(body)
    }).then((res) => res.json())
      .catch((err) => console.log("An error occured while doing a patch on " + url, err))
  }

  async PUT(url: string, body: any, _headers: HeadersInit = {}) {
    return fetch(url, {
      method: "PATCH",
      headers: { ...Headers, ..._headers },
      body: JSON.stringify(body)
    }).then((res) => res.json())
      .catch((err) => console.log("An error occured while doing a put on " + url, err))
  }

  async GET(url: string, _headers: HeadersInit = {}) {
    return fetch(url, {
      method: "GET",
      headers: { ...Headers, ..._headers },
    })
      .then((res) => res.json())
      .catch((err) =>
        console.log("an error occurs while fetching on " + url, err)
      );
  }

  async DELETE(url: string, _headers: HeadersInit = {}) {
    return fetch(url, {
      method: "DELETE",
      headers: { ...Headers, ..._headers },
    })
      .then((res) => res.json())
      .catch((err) =>
        console.log("an error occurs while fetching on " + url, err)
      );
  }

  // async POST(url: string, body: any, _headers: HeadersInit = {}) {
  //   return fetch(url, {
  //     method: "POST",
  //     headers: { ...Headers, ..._headers },
  //     body: JSON.stringify(body),
  //   })
  //     .then((res) => res.json())
  //     .catch((err) =>
  //       console.log("an error occurs while fetching on " + url, err)
  //     );
  // }

  async POST(url: string, body: any, _headers: HeadersInit = {}) {
    return fetch(url, {
      method: "POST",
      headers: { ...Headers, ..._headers },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  // async POST(url: string, body: any, _headers: HeadersInit = {}) {
  //   try {
  //     const response = await fetch(
  //       "https://senwisetool-project-backend.onrender.com",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json", // Définir le Content-Type
  //           ..._headers, // Ajouter les autres en-têtes passés en paramètre
  //         },
  //         body: JSON.stringify(body),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     } else {
  //       console.log("Sucèèèèèèèès !!!");
  //     }

  //     return await response.json();
  //   } catch (error) {
  //     console.error("Error in POST request:", error);
  //     throw error; // Relancer l'erreur pour la gestion externe
  //   }
  // }
}

export const apiObj = () => new ApiCall();
