export {};

declare global {
  export type Image = {
    createdAt: Date;
    filename: string;
    id: number;
    url: string;
  };
}
