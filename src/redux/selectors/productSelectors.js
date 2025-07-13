import { createSelector } from '@reduxjs/toolkit';

const selectProducts = state => state.products.items;
const selectSearchTerm = state => state.products.searchTerm;
const selectSelectedCategory = state => state.products.selectedCategory;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchTerm, selectSelectedCategory],
  (products, searchTerm, category) => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'All' || !category
        ? true
        : product.category === category;
      return matchesSearch && matchesCategory;
    });
  }
);
