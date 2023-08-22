const MAX_PAGES = 5;
const TRUNCATION_LIMIT = 3;

export const createPagination = (currentPage: number, numPages: number) => {
  if (numPages <= MAX_PAGES) {
    // Renders as: [1] 2 3 4 5
    return {
      items: Array.from({ length: numPages }, (_, i) => i + 1),
      activeIndex: currentPage - 1
    };
  }

  let activeIndex;
  // Pagination always begins with the first page.
  const items: Array<"..." | number> = [1];

  if (currentPage > TRUNCATION_LIMIT && currentPage <= numPages - TRUNCATION_LIMIT) {
    // Renders as: 1 ... [15] ... 60
    activeIndex = 2;
    items.push("...");
    items.push(currentPage);
    items.push("...");
  } else if (currentPage > TRUNCATION_LIMIT) {
    // Renders as: 1 ... [4] 5 6
    // Renders as: 1 ... 4 [5] 6
    const lastIndex = MAX_PAGES - 1;
    activeIndex = lastIndex - (numPages - currentPage);
    items.push("...");
    items.push(numPages - 2);
    items.push(numPages - 1);
  } else if (currentPage <= numPages - TRUNCATION_LIMIT) {
    // Renders as: 1 [2] 3 ... 6
    // Renders as: 1 2 [3] ... 6
    activeIndex = currentPage - 1;
    items.push(2);
    items.push(3);
    items.push("...");
  }

  // Pagination always ends with the last page.
  items.push(numPages);

  return {
    items,
    activeIndex
  };
};
