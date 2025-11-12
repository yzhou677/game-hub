export type GalleryItem = {
  original: string;
  thumbnail: string;
  description: string;
  originalClass: string;
  renderItem: () => JSX.Element;
};