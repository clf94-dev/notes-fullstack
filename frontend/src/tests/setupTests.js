import "@testing-library/jest-dom";
import "@/tests/mocks/router";
import "@/tests/mocks/i18n";
import "@/tests/mocks/api";

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated but AntD might call it
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(), // modern
      removeEventListener: vi.fn(), // modern
      dispatchEvent: vi.fn(),
    })),
  });
}
