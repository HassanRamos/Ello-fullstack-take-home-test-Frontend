import React from 'react';
import { Chip, Stack, Typography } from '@mui/material';

const Filter = ({ readingLevels, selectedLevel, setSelectedLevel }) => {
  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      marginBottom={2}
      sx={{
        flexWrap: 'wrap',
      }}
    >
      <Typography variant="subtitle1" marginRight={2} fontWeight="bolder">
        Reading:
      </Typography>
      {readingLevels.map((level) => (
        <Chip
          key={level}
          label={`Level ${level}`}
          clickable
          color={selectedLevel === level ? 'primary' : 'default'}
          onClick={() => handleLevelClick(level)}
          sx={{
            marginBottom: 1,
            mx: 0.5,
            border: '1px solid',
            borderColor: selectedLevel === level ? 'primary.main' : 'secondary.main',
            backgroundColor: selectedLevel === level ? 'primary.main' : 'white',
            color: selectedLevel === level ? 'white' : 'black',
          }}
        />
      ))}
    </Stack>
  );
};

export default Filter;
