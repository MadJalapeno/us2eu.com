// _config/tagcloud.js

module.exports = function(eleventyConfig) {
  
  // Create a collection of all tags with their counts
  eleventyConfig.addCollection("tagCloud", function(collectionApi) {
    const tagCount = {};
    
    // Get all content from multiple folders
    const allContent = [
      ...collectionApi.getFilteredByGlob("src/posts/*.md"),
      ...collectionApi.getFilteredByGlob("src/research/*.md")
    ];
    
    allContent.forEach(function(item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        
        // Handle both string and array tags
        if (typeof tags === "string") {
          tags = [tags];
        }
        
        tags.forEach(function(tag) {
          // Skip the "posts" collection tag and any other tags you want to exclude
          if (tag !== "posts") {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
          }
        });
      }
    });
    
    // Convert to array and sort by count (descending)
    return Object.entries(tagCount)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  });

  // Filter to get tag size class based on count
  eleventyConfig.addFilter("tagSize", function(count, maxCount) {
    if (!maxCount || maxCount === 0) return "text-base";
    
    const ratio = count / maxCount;
    
    if (ratio >= 0.8) return "text-2xl";
    if (ratio >= 0.6) return "text-xl"; 
    if (ratio >= 0.4) return "text-lg";
    if (ratio >= 0.2) return "text-base";
    return "text-sm";
  });

  // Filter to get tag opacity based on count
  eleventyConfig.addFilter("tagOpacity", function(count, maxCount) {
    if (!maxCount || maxCount === 0) return "opacity-100";
    
    const ratio = count / maxCount;
    
    if (ratio >= 0.8) return "opacity-100";
    if (ratio >= 0.6) return "opacity-90";
    if (ratio >= 0.4) return "opacity-80";
    if (ratio >= 0.2) return "opacity-70";
    return "opacity-60";
  });

  // Filter to get consistent color class for each tag
  eleventyConfig.addFilter("tagColor", function(tag) {
    if (!tag) return "text-gray-600";
    
    const colors = [
      "text-red-600 hover:text-red-800",
      "text-blue-600 hover:text-blue-800", 
      "text-green-600 hover:text-green-800",
      "text-purple-600 hover:text-purple-800",
      "text-yellow-600 hover:text-yellow-800",
      "text-pink-600 hover:text-pink-800",
      "text-indigo-600 hover:text-indigo-800",
      "text-teal-600 hover:text-teal-800",
      "text-orange-600 hover:text-orange-800",
      "text-cyan-600 hover:text-cyan-800"
    ];
    
    // Use tag name to consistently assign colors
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  });

  // Optional: Filter to get tag weight class for different styling
  eleventyConfig.addFilter("tagWeight", function(count, maxCount) {
    const ratio = count / maxCount;
    
    if (ratio >= 0.8) return "font-bold";
    if (ratio >= 0.6) return "font-semibold";
    if (ratio >= 0.4) return "font-medium";
    return "font-normal";
  });
};