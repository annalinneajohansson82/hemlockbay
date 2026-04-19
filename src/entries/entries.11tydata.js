// All files in /entries/ automatically get this layout and tag.
// Adding a new species = adding one new .md file, nothing else.

module.exports = {
  layout: "layouts/entry.njk",
  tags: ["entries"],
  permalink: "/entries/{{ page.fileSlug }}/"
};
