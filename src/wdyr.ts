/// <reference types="@welldone-software/why-did-you-render" />

import React from "react";
import process from "process";

if (process.env.NODE_ENV === "development") {
    const whyDidYouRender = require("@welldone-software/why-did-you-render");
    whyDidYouRender(React, {
        trackAllPureComponents: true,
    });
}

console.log("why did you render setup");
