const now = String(Date.now())

// Image transform plugin
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

// add id to headings
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

// Time to read plugin
const timeToRead = require('eleventy-plugin-time-to-read');



// CSV parser
const { parse } = require('csv-parse');

require('dotenv').config();

module.exports = function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setLayoutsDirectory("_layouts");

  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });
  
  eleventyConfig.addWatchTarget("src");

    eleventyConfig.setServerOptions({
    liveReload: true
  });

  // read data from .env file to determine dev or prod
  eleventyConfig.addGlobalData("env", process.env.ELEVENTY_ENV);

  

  // Plug Ins
  eleventyConfig.addPlugin(eleventyImageTransformPlugin,{
    formats: ["avif", "webp", "jpeg"],

  });

  eleventyConfig.addPlugin(timeToRead);
  
  let markdownLibrary = markdownIt({
    html: true,
  });
  
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addFilter("excerpt", (post) => {
    if (post.includes("<!--more-->")) {
      return post.split("<!--more-->")[0];
    }
    // Fallback to word limit
    const content = post.replace(/(<([^>]+)>)/gi, "");
    const words = content.trim().split(/\s+/);
    return words.slice(0, 45).join(" ") + (words.length > 45 ? "..." : "");
  });

};

module.exports.config = {
  htmlTemplateEngine: "njk",
  markdownTemplateEngine: "njk"
};