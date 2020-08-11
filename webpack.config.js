/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    entry: {
      bundle: "./src/index.ts"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isDevelopment ? "bundle.js" : "bundle.[hash].js"
    },
    devtool: isDevelopment && "source-map",
    devServer: {
      port: 3000,
      open: true,
      contentBase: path.join(__dirname, "src")
    },
    module: {
      rules: [
        {
          test: /\.hbs$/,
          loader: "handlebars-loader",
          options: {
            helperDirs: path.resolve(__dirname, "helpers"),
            inlineRequires: "/assets/"
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === "development"
              }
            },
            "css-loader",
            {
              loader: `postcss-loader`,
              options: {
                options: {}
              }
            },
            "sass-loader"
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: isDevelopment ? "[name].[ext]" : "[name].[hash].[ext]",
                outputPath: "static/",
                useRelativePath: true
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: isDevelopment ? "[name].[ext]" : "[name].[hash].[ext]",
                outputPath: "static/",
                esModule: false,
                useRelativePath: true
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: true
                },
                pngquant: {
                  quality: "65-90",
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                },
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.LoaderOptionsPlugin({
        options: {
          handlebarsLoader: {}
        }
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? "[name].css" : "[name].[hash].css",
        chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css"
      }),

      new HtmlWebpackPlugin({
        title: "Ilya Kurganskii",
        template: "./src/index.hbs",
        filename: "index.html",
        templateParameters: {
          'locale': 'en'
        },
        minify: !isDevelopment && {
          html5: true,
          collapseWhitespace: true,
          caseSensitive: true,
          removeComments: true
        }
      }),
      new HtmlWebpackPlugin({
        title: "Ilya Kurganskii",
        template: "./src/index.hbs",
        filename: `index.ru.html`,
        templateParameters: {
          'locale': 'ru'
        },
        minify: !isDevelopment && {
          html5: true,
          collapseWhitespace: true,
          caseSensitive: true,
          removeComments: true
        }
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "CNAME"),
            to: path.resolve(__dirname, "dist")
          }
        ]
      })
    ]
  }
