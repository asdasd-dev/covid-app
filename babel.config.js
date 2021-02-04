module.exports = (api) => {
    console.log("babel env: " + api.env());
    return {
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
                    development: api.env("development"),
                    importSource: "@welldone-software/why-did-you-render",
                },
            ],
            "@babel/typescript",
        ],
    };
};
