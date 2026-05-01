// ============================================================
// Hemlock Bay — Eleventy config
// ============================================================

module.exports = function (eleventyConfig) {
  // --- Static assets (CSS, images, fonts) pass through unchanged
  eleventyConfig.addPassthroughCopy("src/assets");

  // --- Roman numeral filter (for plate and tab numbering)
  //     Usage in templates: {{ plate | roman }}   →   CIII
  eleventyConfig.addFilter("roman", function (num) {
    if (num === null || num === undefined) return "";
    const table = [
      ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
      ["C", 100],  ["XC", 90],  ["L", 50],  ["XL", 40],
      ["X", 10],   ["IX", 9],   ["V", 5],   ["IV", 4], ["I", 1]
    ];
    let n = Number(num);
    let out = "";
    for (const [letter, value] of table) {
      while (n >= value) {
        out += letter;
        n -= value;
      }
    }
    return out;
  });

  // --- String startsWith helper for aria-current nav detection
  eleventyConfig.addFilter("startsWith", (str, prefix) => String(str).startsWith(prefix));

  // --- Archival-style date filter
  eleventyConfig.addFilter("archivalDate", function (date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
