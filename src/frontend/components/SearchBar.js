import React from 'react';
import { TextField, Box, useTheme } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import image from '../assets/image10.webp';

const SearchBar = ({ setSearchTerm, books }) => {
  const theme = useTheme();

  const handleChange = (event, value) => {
    setSearchTerm(value);
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
          <Box {...props} sx={{ display: 'flex', alignItems: 'center', fontFamily: theme.typography.fontFamily }}>
            <img src={image} alt={option.title} style={{ width: 50, height: 50, marginRight: 10, borderRadius: 10, padding: 5 }} />
            {option.title}
          </Box>
        )}
      />
    </Box>
  );
};

export default SearchBar;
