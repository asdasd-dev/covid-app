import "./wdyr";

import ReactDOM from "react-dom";
import React from "react";
import { App } from "./App";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { StatsProvider } from "./context/StatsContext";

const theme = {
    recoveredColor: "#8ACA2B",
    deathsColor: "#696969",
    casesColor: "#AAA",
    secondaryColor: "lightgrey",
};

const GlobalStyles = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        height: 100%;
        margin: 0;
    }

    #root {
        height: 100%
    }

    * {
        box-sizing: border-box;
    }
`;

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <StatsProvider>
            <App />
            <GlobalStyles />
        </StatsProvider>
    </ThemeProvider>,
    document.getElementById("root")
);
