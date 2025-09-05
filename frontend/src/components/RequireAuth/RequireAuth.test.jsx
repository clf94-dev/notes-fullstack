import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { beforeEach, describe, expect, vi } from "vitest";
import { locale } from "moment";

function SecretPage() {
  return <div>Secret Content</div>;
}

function makeToken(expSecondsFromNow) {
  const exp = Math.floor(Date.now() / 1000) + expSecondsFromNow;
  // minimal JWT structure: header.payload.signature
  const payload = { exp };
  const base64 = btoa(JSON.stringify(payload));
  return `xxx.${base64}.yyy`;
}

describe("RequireAuth", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("redirects to /login if no token", () => {
    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route
            path="/secret"
            element={
              <RequireAuth>
                <SecretPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects to /login if token is expired", () => {
    const expiredToken = makeToken(-10); // expired 10s second ago
    localStorage.setItem("token", expiredToken);

    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route
            path="/secret"
            element={
              <RequireAuth>
                <SecretPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("renders children if token is valid", () => {
    const validToken = makeToken(60); // expires in 60 seconds
    localStorage.setItem("token", validToken);

    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route
            path="/secret"
            element={
              <RequireAuth>
                <SecretPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Secret Content")).toBeInTheDocument();
  });

  it("renders Outlet if no children and token is valid", () => {
    const validToken = makeToken(60); // expires in 60 seconds
    localStorage.setItem("token", validToken);

    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/secret" element={<SecretPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Secret Content")).toBeInTheDocument();
  });
});
