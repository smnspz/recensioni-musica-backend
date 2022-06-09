import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy, mockClear } from "jest-mock-extended";

import prisma from "./client";

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeAll(async () => {});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
