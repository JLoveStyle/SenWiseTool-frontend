import { TrainingProps } from "@/components/atoms/training/form-training";

export const db_create_training = async (data: TrainingProps) => {
  try {
    const response = await fetch("/api/training", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return { data: result.message };
  } catch (error) {
    return {
      error: {
        message: (error as Error).message || "Erreur inconnue",
        code: (error as any).code || 500,
      },
    };
  }
};

export const db_update_training = async (data: TrainingProps) => {
  try {
    const response = await fetch("/api/training", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return { data: result.message };
  } catch (error) {
    return {
      error: {
        message: (error as Error).message || "Erreur inconnue",
        code: (error as any).code || 500,
      },
    };
  }
};

export const db_delete_training = async (theme: string) => {
  try {
    const response = await fetch(
      `/api/training?id=${encodeURIComponent(theme)}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();
    return { data: result.message };
  } catch (error) {
    return {
      error: {
        message: (error as Error).message || "Erreur inconnue",
        code: (error as any).code || 500,
      },
    };
  }
};
