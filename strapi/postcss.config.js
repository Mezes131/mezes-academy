/** Local PostCSS for Strapi admin Vite build.
 * Prevents Vite from walking up to the SPA root postcss.config.js
 * (which requires tailwindcss, not installed in strapi/).
 */
export default {
  plugins: {},
};
