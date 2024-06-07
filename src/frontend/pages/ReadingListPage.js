import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import BookCard from '../components/BookCard';
import RemoveIcon from '@mui/icons-material/Remove';

const ReadingListPage = ({ readingList, removeBookFromList }) => {
  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Reading List
      </Typography>
      {readingList.length === 0 ? (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
          <Grid item>
            <Typography variant="body1" align="center">
              Your reading list is empty.
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {readingList.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={book.title}>
              <BookCard book={book} actionLabel="Reading List" icon={<RemoveIcon />} actionHandler={removeBookFromList} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ReadingListPage;
