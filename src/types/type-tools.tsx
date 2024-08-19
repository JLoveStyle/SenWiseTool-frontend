export type objecType = { [key: string]: string };

export type SessionStatusType = "guest" | "authenticated";

export interface cardDataType {
  title: string;
  image: string;
  content: React.ReactNode;
}
