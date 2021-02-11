import React from "react";
import { App } from "App";
import { screen } from "@testing-library/react";
import { render } from "test-utils";

describe("App component", () => {
    test("App renders and spinning 2 loaders", () => {
        render(<App />);
        expect(screen.getAllByText(/Loading/i).length).toBe(2);
    });
});
