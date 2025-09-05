import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { navigateMock } from "@/tests/mocks/router";
import { BrowserRouter } from "react-router-dom";
import SideMenu from "./SideMenu";
import { vi } from "vitest";
import { message } from "antd";

// Mock i18n: return key as label so tests don't depend on translations
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

// Mock service that fetches tags
vi.mock("@/services/dashboard", () => ({
  fetchTagsData: vi.fn(),
}));

// Spy on antd message.error
vi.spyOn(message, "error").mockImplementation(() => {});

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("SideMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    navigateMock.mockClear();
  });

  it("renders static menu items", async () => {
    const { fetchTagsData } = await import("@/services/dashboard");
    fetchTagsData.mockResolvedValueOnce([]); // no tags

    renderWithRouter(<SideMenu />);

    // Static labels (we return keys from t())
    expect(screen.getByText("sideMenu.notes")).toBeInTheDocument();
    expect(screen.getByText("sideMenu.archivedNotes")).toBeInTheDocument();
    expect(screen.getByText("sideMenu.tags")).toBeInTheDocument();

    // Logo image (alt from your component)
    expect(screen.getByAltText("Notes Logo")).toBeInTheDocument();
  });

  it("fetches and displays tags", async () => {
    const { fetchTagsData } = await import("@/services/dashboard");
    fetchTagsData.mockResolvedValueOnce([
      { id: 1, name: "Work" },
      { id: 2, name: "Personal" },
    ]);

    renderWithRouter(<SideMenu />);

    await waitFor(() => {
      expect(screen.getByText("Work")).toBeInTheDocument();
      expect(screen.getByText("Personal")).toBeInTheDocument();
    });
  });

  it("shows an error when fetch fails", async () => {
    const { fetchTagsData } = await import("@/services/dashboard");
    fetchTagsData.mockRejectedValueOnce("Network error");

    renderWithRouter(<SideMenu />);

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith("Network error");
    });
  });

  it("navigates when clicking a menu item", async () => {
    const { fetchTagsData } = await import("@/services/dashboard");
    fetchTagsData.mockResolvedValueOnce([]);

    renderWithRouter(<SideMenu />);

    // Click on “notes”
    fireEvent.click(screen.getByText("sideMenu.notes"));

    expect(navigateMock).toHaveBeenCalledWith("/notes");
  });
});
