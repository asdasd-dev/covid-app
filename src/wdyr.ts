/// <reference types="@welldone-software/why-did-you-render" />

import React from "react";

if (process.env.NODE_ENV === "development") {
    const whyDidYouRender = require("@welldone-software/why-did-you-render");
    console.log(process.env.NODE_ENV);
    whyDidYouRender(React, {
        trackAllPureComponents: true,
    });
}

console.log("why did you render setup");
