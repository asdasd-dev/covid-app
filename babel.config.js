module.exports = {
    presets: [
        [
            "@babel/env",
            {
                corejs: 3,
                useBuiltIns: "usage",
                modules: false,
            },
        ],
        [
            "@babel/react",
            {
                runtime: "automatic",
                development: true,
                importSource: "@welldone-software/why-did-you-render",
            },
        ],
        "@babel/typescript",
    ],
};
