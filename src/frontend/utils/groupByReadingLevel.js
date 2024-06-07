export const groupByReadingLevel = (books) => {
    return books.reduce((groups, book) => {
      const level = book.readingLevel;
      if (!groups[level]) {
        groups[level] = [];
      }
      groups[level].push(book);
      return groups;
    }, {});
  };
  