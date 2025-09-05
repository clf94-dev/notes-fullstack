import { vi } from "vitest";

// Mock dashboard service
vi.mock("@/services/dashboard", () => ({
  fetchTagsData: vi.fn(),
}));
