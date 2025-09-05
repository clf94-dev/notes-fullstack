import { vi } from "vitest";

export const navigateMock = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useNavigate: () => navigateMock,
  };
});
