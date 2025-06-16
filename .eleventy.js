module.exports = function (eleventyConfig) {
  // copy site data
  eleventyConfig.addPassthroughCopy('htaccess.txt');
  eleventyConfig.addPassthroughCopy('.htaccess');
  // copy directories to the output
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('img');
  // copy favicons
  eleventyConfig.addPassthroughCopy('site.webmanifest');
  eleventyConfig.addPassthroughCopy('*.ico');
  eleventyConfig.addPassthroughCopy('*.png');

  // watch directories for changes
  eleventyConfig.addWatchTarget('css');
  eleventyConfig.addWatchTarget('js');
  eleventyConfig.addWatchTarget('img');
  eleventyConfig.addWatchTarget('cards');
  eleventyConfig.addWatchTarget('site.webmanifest');

};