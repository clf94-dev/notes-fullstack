import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Header from "./Header";
import { vi, beforeEach, describe, it, expect } from "vitest";
import { navigateMock } from "@/tests/mocks/router"; // only import the mock function

function renderAt(pathname = "/notes") {
  const router = createMemoryRouter([{ path: "*", element: <Header /> }], {
    initialEntries: [pathname],
  });
  return render(<RouterProvider router={router} />);
}

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    navigateMock.mockClear();
  });

  it.each([
    ["/notes", "header.notes"],
    ["/archive", "header.archivedNotes"],
    ["/settings", "header.settings"],
    ["/unknown", "header.notFound"],
  ])("shows correct header for %s", (path, expectedKey) => {
    renderAt(path);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      expectedKey
    );
  });

  it("shows tagged header for /tagged/<tag>", () => {
    renderAt("/tagged/work");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "header.taggedNotes"
    );
  });

  it("renders search placeholder", () => {
    renderAt("/notes");
    expect(
      screen.getByPlaceholderText("header.searchPlaceholder")
    ).toBeInTheDocument();
  });

  it("navigates to /settings when button is clicked", () => {
    renderAt("/notes");
    const settingsBtn = screen.getByRole("button");
    fireEvent.click(settingsBtn);
    expect(navigateMock).toHaveBeenCalledWith("/settings");
  });
});
