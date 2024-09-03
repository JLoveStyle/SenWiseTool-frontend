import { TrainingProps } from "@/components/atoms/training/form-training";

export function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("TrainingDB", 1);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("trainings")) {
        const objectStore = db.createObjectStore("trainings", {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("theme", "theme", { unique: false });
        objectStore.createIndex("start_date", "start_date", { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function addTraining(training: TrainingProps): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction("trainings", "readwrite");
  const store = transaction.objectStore("trainings");

  store.add(training);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getTrainings(): Promise<TrainingProps[]> {
  const db = await openDatabase();
  const transaction = db.transaction("trainings", "readonly");
  const store = transaction.objectStore("trainings");

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      resolve(request.result as TrainingProps[]);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}
