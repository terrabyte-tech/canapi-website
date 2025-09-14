const cheerio = require("cheerio");
const site = require("./_data/site.json");

module.exports = function (eleventyConfig) {
  // copy site data
  eleventyConfig.addPassthroughCopy('.htaccess');
  // copy directories to the output
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('img');
  // copy favicons
  eleventyConfig.addPassthroughCopy('*.ico');
  eleventyConfig.addPassthroughCopy('*.png');

  // watch directories for changes
  eleventyConfig.addWatchTarget('css');
  eleventyConfig.addWatchTarget('js');
  eleventyConfig.addWatchTarget('img');

  // shortcodes
  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);

  // page transforms and filters
  // FILTER: split a string by a separator
  eleventyConfig.addFilter("split", function(str, separator) {
    if (!str) return [];
    return str.split(separator);
  });

  // FILTER: Generate canonical URL
  eleventyConfig.addFilter("canonicalUrl", function(pageUrl) {
    // Remove trailing slash from site.url (if present, though it shouldn't be)
    const base = site.url.replace(/\/$/, "");

    // check if it's the homepage; if so, just return the base URL
    if (!pageUrl || pageUrl === "/" || pageUrl === "/index.html") {
      return base;
    }
    
    // otherwise, ensure pageUrl starts with a slash
    const rel = pageUrl.startsWith("/") ? pageUrl : `/${pageUrl}`;
    return base + rel;
  });

  // TRANSFORM: create accessibility table of contents
  eleventyConfig.addTransform("injectSrToc", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      const $ = cheerio.load(content);

      // Build TOC from sections
      const sections = [];
      $("section[id]").each((i, elem) => {
        const id = $(elem).attr("id");
        const title = id + " section";
        sections.push({ id, title });
      });

      // Only inject if there are sections
      if (sections.length) {
        const tocHtml = `
<nav class="sr-only sr-toc" aria-label="Table of Contents" role="navigation">
  <h2>Page Table of Contents</h2>
  <ul>
    <li><a class="text-link" href="#top">Jump to content</a></li>
    ${sections.map(s => `<li><a href="#${s.id}" class="text-link" tabindex="0">${s.title}</a></li>`).join("\n")}
  </ul>
</nav>
        `;
        // Insert TOC at the start of <body> on the page
        $("body").prepend(tocHtml);
        return $.html();
      }
    }
    return content;
  });

};