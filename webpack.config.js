const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = (env) => {
    const isProd = !!env.production;
    const isDev = !!env.development;

    const getStyleLoaders = () => {
        return [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"];
    };

    const getPlugins = () => {
        const plugins = [
            new HtmlWebpackPlugin({
                template: "public/index.html",
            }),
            new ESLintWebpackPlugin({
                extensions: ["js", "jsx", "ts", "tsx"],
            })
        ];

        isProd &&
            plugins.push(
                new MiniCssExtractPlugin({
                    filename: "main-[hash:8].css",
                })
            );

        return plugins;
    };

    return {
        mode: isProd ? "production" : isDev ? "development" : "none",

        entry: "./src/index.tsx",

        output: {
            publicPath: "/",
            filename: isProd ? "main-[hash:8].js" : undefined,
        },

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            plugins: [new TsconfigPathsPlugin()]
        },

        module: {
            rules: [
                //Loading js
                {
                    test: /\.(js|ts)x?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        envName: isProd ? "production" : "development",
                        retainLines: true,
                    },
                },

                //Loading images
                {
                    test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "images",
                                name: "[name]-[sha1:hash:7].[ext]",
                            },
                        },
                    ],
                },

                //Loading fonts
                {
                    test: /\.(ttf|woff|woff2|eot|otf)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "fonts",
                                name: "[name].[ext]",
                            },
                        },
                    ],
                },

                //Loading css
                {
                    test: /\.css$/,
                    use: getStyleLoaders(),
                },

                //Loading scss
                {
                    test: /\.s[ac]ss$/,
                    use: [...getStyleLoaders(), "sass-loader"],
                },
            ],
        },

        plugins: getPlugins(),

        devServer: {
            open: true,
            historyApiFallback: true,
            port: 3000,
        },

        target: isDev ? "web" : "browserslist",

        devtool: isProd ? "hidden-source-map" : "eval",
    };
};
