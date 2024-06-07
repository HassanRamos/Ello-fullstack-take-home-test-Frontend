// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box, Button, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useQuery, gql } from '@apollo/client';
import theme from './frontend/theme';
import BookListPage from './frontend/pages/BookListPage';
import ReadingListPage from './frontend/pages/ReadingListPage';
import logo from './logoEllo.png'; // Import the logo image

const BOOKS_QUERY = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [readingList, setReadingList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const { loading, error, data } = useQuery(BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const books = data.books;

  const addBookToList = (book) => {
    setReadingList((prevList) => {
      if (!prevList.some((b) => b.title === book.title)) {
        setAlertMessage(`Added "${book.title}" to the reading list.`);
        setAlertSeverity('success');
        setAlertOpen(true);
        return [...prevList, book];
      } else {
        setAlertMessage(`"${book.title}" is already in the reading list.`);
        setAlertSeverity('warning');
        setAlertOpen(true);
        return prevList;
      }
    });
  };

  const removeBookFromList = (bookToRemove) => {
    setReadingList((prevList) => {
      setAlertMessage(`Removed "${bookToRemove.title}" from the reading list.`);
      setAlertSeverity('info');
      setAlertOpen(true);
      return prevList.filter((book) => book.title !== bookToRemove.title);
    });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container sx={{ padding: '20px', marginBottom: '50px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
            <Box display="flex" alignItems="center">
              <Button component={Link} to="/" >
              <img src={logo} alt="Logo"  style={{ height: '40px', marginRight: '20px' }} />
              </Button>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button component={Link} to="/" variant="text" color="secondary">
                Book List
              </Button>
              <Button component={Link} to="/reading-list" variant="text" color="secondary">
                Reading List ({readingList.length})
              </Button>
            </Box>
          </Box>
          <Routes>
            <Route 
              path="/" 
              element={<BookListPage
                books={books}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                addBookToList={addBookToList}
              />} 
            />
            <Route 
              path="/reading-list" 
              element={<ReadingListPage 
                readingList={readingList} 
                removeBookFromList={removeBookFromList} 
              />} 
            />
          </Routes>
          <Snackbar
            open={alertOpen} 
            autoHideDuration={3000} 
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
          >
            <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '50%' }}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
