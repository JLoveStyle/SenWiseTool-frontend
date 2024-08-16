
const Headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};


export default class ApiCall {
  
  async PATCH(url: string, body: any, _headers: HeadersInit = {}) {
    return fetch(url, {
      method: "PATCH",
      headers: { ...Headers, ..._headers },
      body: JSON.stringify(body)
    }).then((res) => res.json())
      .catch((err) => console.log("An error occured while posting on "+ url, err))
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
}
