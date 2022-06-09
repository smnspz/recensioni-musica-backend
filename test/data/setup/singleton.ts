import { Prisma, PrismaClient } from "@prisma/client";
import {
  mockDeep,
  mockReset,
  DeepMockProxy,
  mockClear,
} from "jest-mock-extended";

import prisma from "./client";

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

afterEach(() => {
  mockReset(prismaMock);
});

afterAll;

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
