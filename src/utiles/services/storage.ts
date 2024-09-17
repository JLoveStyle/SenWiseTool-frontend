// "use client";

type OPTIONS = {
  type: "STRING" | "OBJECT";
};

export class LOCAL_STORAGE {
  static save(key: string, value: any) {
    if (typeof window === "undefined") return;
    return localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: string, options: OPTIONS = { type: "OBJECT" }) {
    let data: any;

    if (typeof window !== "undefined") {
      data = localStorage.getItem(key);
    }

    if (data) {
      // return data;
      return JSON.parse(data);
    }
  }
}
