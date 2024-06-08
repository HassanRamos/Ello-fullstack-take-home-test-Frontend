import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import Filter from '../utils/Filter';
import { groupByReadingLevel } from '../utils/groupByReadingLevel';

const BookListPage = ({ books, searchTerm, setSearchTerm, selectedLevel, setSelectedLevel, addBookToList }) => {
  const [visibleBooks, setVisibleBooks] = useState(12); // Initial number of visible books

  //Filter books on book list page based on  user input in search bar
  const filteredBooks = books.filter(
    (book) =>
      (searchTerm === '' ||
        (typeof searchTerm === 'string' && book.title.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedLevel === 'All' || book.readingLevel === selectedLevel)
  );

  /// Group books based on Reading Level
  const groupedBooks = groupByReadingLevel(books);
  const readingLevels = ['All', ...Object.keys(groupedBooks).sort()];


  //Fuction to handle loading more books as user scroll
  const handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      // When the user scrolls to the bottom of the page, load more books
      setVisibleBooks((prevVisibleBooks) => prevVisibleBooks + 6);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <Container sx={{ padding: '20px', marginBottom: '50px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Ello Book Assignment
      </Typography>
      <Box display="flex" justifyContent="center" my={2}>
        <SearchBar setSearchTerm={setSearchTerm} books={books} />
      </Box>
      <Box my={4}>
        <Filter readingLevels={readingLevels} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />
      </Box>
      {filteredBooks.length === 0 ? (
        <Typography variant="h6" align="center" gutterBottom>
          No books found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredBooks.slice(0, visibleBooks).map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={book.title}>
              <BookCard book={book} actionLabel="Reading List" icon={<AddIcon />} actionHandler={addBookToList} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BookListPage;