const productModules = import.meta.glob('./product-items/*.js', { eager: true });

export const products = Object.values(productModules)
  .map(module => module.default)
  .sort((a, b) => a.id - b.id);
