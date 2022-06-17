export default interface Review {
  id?: number;
  album: string;
  artist: string;
  content: string;
  published?: boolean;
  genre: string;
  rating: number;
  title: string;
  authorId: number;
}
