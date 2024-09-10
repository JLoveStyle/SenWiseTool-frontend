import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

type Trainer = {
  id: number;
  name: string;
  age: number;
};

const filePath = path.join(process.cwd(), "db.json");

const readData = (): Trainer[] => {
  if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify([]));
  }
  const data = readFileSync(filePath, "utf-8");
  return JSON.parse(data) as Trainer[];
};

const writeData = (data: Trainer[]) => {
  writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const addTrainer = (trainer: Trainer) => {
  const trainers = readData();
  trainers.push(trainer);
  writeData(trainers);
};
