// _config/filters.js

module.exports = function(eleventyConfig) {
  
  // Excerpt filter
  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, ""); // Strip HTML tags
    const words = content.trim().split(/\s+/);
    return words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "");
  });

  // Date formatting filters


  eleventyConfig.addFilter("dateFilter", (date, format = "MMMM dd, yyyy") => {
  const dateObj = new Date(date);
  const options = {};
  if (format.includes("MMMM")) options.month = "long";
  else if (format.includes("MMM")) options.month = "short";
  else if (format.includes("MM")) options.month = "2-digit";
  if (format.includes("dd")) options.day = "2-digit";
  else if (format.includes("d")) options.day = "numeric";
  if (format.includes("yyyy")) options.year = "numeric";
  else if (format.includes("yy")) options.year = "2-digit";
  return dateObj.toLocaleDateString('en-US', options);
  });

  eleventyConfig.addFilter("date", (date, format = "MMMM dd, yyyy") => {
    const dateObj = new Date(date);
    
    const options = {};
    if (format.includes("MMMM")) {
      options.month = "long";
    } else if (format.includes("MMM")) {
      options.month = "short";
    } else if (format.includes("MM")) {
      options.month = "2-digit";
    }
    
    if (format.includes("dd")) {
      options.day = "2-digit";
    } else if (format.includes("d")) {
      options.day = "numeric";
    }
    
    if (format.includes("yyyy")) {
      options.year = "numeric";
    } else if (format.includes("yy")) {
      options.year = "2-digit";
    }
    
    return dateObj.toLocaleDateString('en-US', options);
  });

  // Slug filter for URLs
  eleventyConfig.addFilter("slug", (str) => {
    if (!str) return '';
    return str
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  });

  // toLowerCase filter
  eleventyConfig.addFilter("toLowerCase", (str) => {
    return str ? str.toLowerCase() : '';
  });

  // Reading time estimate
  eleventyConfig.addFilter("readingTime", (text) => {
    const wordsPerMinute = 200;
    const numberOfWords = text.split(/\s/g).length;
    const minutes = numberOfWords / wordsPerMinute;
    return Math.ceil(minutes);
  });

  // Unique filter - removes duplicates from array
  eleventyConfig.addFilter("unique", (array) => {
    if (!Array.isArray(array)) return [];
    return [...new Set(array)];
  });

  // Sort filter
  eleventyConfig.addFilter("sort", (array) => {
    if (!Array.isArray(array)) return [];
    return array.slice().sort();
  });

};