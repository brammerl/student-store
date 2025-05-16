export const createFilterAndSortObj = (queryParams) => {
  if (Object.keys(queryParams) == 0) {
    return {};
  }
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
