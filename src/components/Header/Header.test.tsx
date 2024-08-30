import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from "./Header";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Header component", () => {
  let navigateMock: jest.Mock;

  beforeEach(() => {
    navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("navigates to home on Home / User list button click", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const homeButton = screen.getByText(/Home \/ User list/i);
    fireEvent.click(homeButton);

    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  test("navigates to tasks on Tasks button click", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const tasksButton = screen.getByText(/Tasks/i);
    fireEvent.click(tasksButton);

    expect(navigateMock).toHaveBeenCalledWith("/tasks");
  });
});
