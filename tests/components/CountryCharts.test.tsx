import React from "react";
import { waitFor, screen } from "@testing-library/react";

import { render } from "test-utils";
import { CountryCharts } from "components/CountryCharts";

describe("CountryCharts component", () => {
    test("Initialize with loader and then render 3 charts", async () => {
        render(<CountryCharts />);
        const loader = screen.queryByText(/Loading/);
        expect(loader).toBeInTheDocument();
        await waitFor(() => expect(loader).not.toBeInTheDocument());
        const charts = document.querySelectorAll("canvas");
        expect(charts.length).toBe(3);
    });
});
