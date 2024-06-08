import React from 'react';
import { TextField, Box, useTheme, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBar = ({ setSearchTerm, books }) => {
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setSearchTerm(newValue);
    } else if (newValue && (newValue.title || newValue.author)) {
      setSearchTerm(newValue.title || newValue.author);
    } else {
      setSearchTerm('');
    }
  };

  return (
    <Box my={2} textAlign="center">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={books}
        getOptionLabel={(option) => option.title}
        filterOptions={(options, { inputValue }) =>
          options.filter(
            (option) =>
              option.title.toLowerCase().includes(inputValue.toLowerCase()) ||
              option.author.toLowerCase().includes(inputValue.toLowerCase())
          )
        }
        sx={{ width: 500 }}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Books by title or author"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.yellow.main,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.yellow.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.yellow.main,
                },
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box
            {...props}
            key={`${option.title}-${option.author}`}
            sx={{ display: 'flex', alignItems: 'center', fontFamily: theme.typography.fontFamily }}
          >
            <img
             src={require(`../${option.coverPhotoURL}`)}
              alt={option.title}
              style={{ width: 50, height: 50, marginRight: 10, borderRadius: 10, padding: 5 }}
            />
            <Box>
              <Typography variant="body1" sx={{ fontFamily: theme.typography.fontFamily }}>
                {option.title}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: theme.typography.fontFamily }}>
                by {option.author}
              </Typography>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default SearchBar;
