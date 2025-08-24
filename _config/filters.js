// _config/filters.js

module.exports = function(eleventyConfig) {
  
  // Excerpt filter
  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, ""); // Strip HTML tags
    const words = content.trim().split(/\s+/);
    return words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "");
  });

  // Date formatting filter
  eleventyConfig.addFilter("dateFormat", (date, format = "MMMM dd, yyyy") => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Slug filter for URLs
  eleventyConfig.addFilter("slug", (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  });

  // Reading time estimate
  eleventyConfig.addFilter("readingTime", (text) => {
    const wordsPerMinute = 200;
    const numberOfWords = text.split(/\s/g).length;
    const minutes = numberOfWords / wordsPerMinute;
    return Math.ceil(minutes);
  });
};