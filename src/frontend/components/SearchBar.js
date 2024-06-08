import React from 'react';
import { TextField, Box, useTheme } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBar = ({ setSearchTerm, books }) => {
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setSearchTerm(newValue);
    } else if (newValue && newValue.title) {
      setSearchTerm(newValue.title);
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
        sx={{ width: 500 }}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Books"
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
            {option.title}
          </Box>
        )}
      />
    </Box>
  );
};

export default SearchBar;