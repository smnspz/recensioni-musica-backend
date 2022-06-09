import { Prisma } from "@prisma/client";

export interface Review {
  id: number;
  album: string;
  artist: string;
  content: string;
  genre: string;
  rating: number;
  title: string;
  authorId: number;
  // createdAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput;
  // updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput;
}
