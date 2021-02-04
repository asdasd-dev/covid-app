import "./wdyr";

import ReactDOM from "react-dom";
import React from "react";
import { App } from "./App";
import { createGlobalStyle } from "styled-components";
import { StatsProvider } from "./context/StatsContext";

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
    <StatsProvider>
        <App />
        <GlobalStyles />
    </StatsProvider>,
    document.getElementById("root")
);
