// .eleventy.js
module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/css/");
  
  // Filters
  eleventyConfig.addFilter("dump", (obj) => {
    return JSON.stringify(obj, null, 2);
  });
  
  eleventyConfig.addFilter("map", (array, prop) => {
    return array.map(item => item[prop]);
  });
  
  eleventyConfig.addFilter("join", (array, separator = ", ") => {
    return array.join(separator);
  });

  // Collections
  eleventyConfig.addCollection("research", function(collection) {
    return collection.getFilteredByGlob("src/research/*.md");
  });
  
  eleventyConfig.addCollection("blog", function(collection) {
    return collection.getFilteredByGlob("src/blog/*.md");
  });

  // Shortcodes for reusable components
  eleventyConfig.addShortcode("hero", function(data) {
    return `{% set hero = ${JSON.stringify(data)} %}{% include "components/hero.njk" %}`;
  });
  
  eleventyConfig.addShortcode("statusCard", function(data) {
    return `{% set status = ${JSON.stringify(data)} %}{% include "components/status-card.njk" %}`;
  });
  
  // Date formatting
  eleventyConfig.addFilter("readableDate", dateObj => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric"
    }).format(dateObj);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};