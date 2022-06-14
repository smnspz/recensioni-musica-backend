export interface Review {
  id: number | undefined;
  album: string;
  artist: string;
  content: string;
  genre: string;
  rating: number;
  title: string;
  authorId: number;
}
