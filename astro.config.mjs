import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages as a project site (served under /webbs-world-of-fitness/).
// When Webb's adopts this on their own domain, set `site` to that domain and drop `base`.
export default defineConfig({
  site: 'https://angelobaleno.github.io',
  base: '/webbs-world-of-fitness',
});
