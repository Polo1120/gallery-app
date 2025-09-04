type ImageBase = {
  dateSpecial: string;
  title: string;
  location: string;
  description: string;
  tags: string[];
  taggedUsernames: string[];
};

export type Image = ImageBase & {
  _id: string;
  url: string;
  filename: string;
};

export interface UploadImageData extends ImageBase {
  file: File;
}