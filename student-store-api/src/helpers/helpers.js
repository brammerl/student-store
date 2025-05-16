export const createFilterAndSortObj = (queryParams) => {
  const { category, sort } = queryParams;

  const filters = {};

  if (category) {
    filters.where = { category: category };
  }

  if (sort) {
    const sortObj = {};
    sortObj[sort] = "asc";
    filters.orderBy = [sortObj];
  }

  return filters;
};
