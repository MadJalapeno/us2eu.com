module.exports = {
  layout: "pages.njk",
  tags: ["research"],
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink; // explicit override wins
      const slug = data.page.fileSlug
        .toLowerCase()
        .replace(/\s+/g, "-");
      return `/research/${slug}/`;
    }
  }
};