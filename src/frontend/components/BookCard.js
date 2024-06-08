import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, Modal, Box, IconButton, Fab } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BookCard = ({ book, actionLabel, actionHandler, icon }) => {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardActionArea onClick={handleOpen} sx={{ flexGrow: 1, position: 'relative' }}>
          <CardMedia
            component="img"
            height="140"
            image={require(`../${book.coverPhotoURL}`)}
            alt={book.title}
          />
          {hovered && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            >
              <IconButton
                aria-label="view"
                sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}
                onClick={handleOpen}
              >
                <VisibilityIcon />
              </IconButton>
            </Box>
          )}
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="div" noWrap>
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              by {book.author}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Fab variant="extended" size="small" sx={{ backgroundColor: '#FABD33', padding: 2, fontSize: 10, color: 'black' }} onClick={() => actionHandler(book)}>
            {icon}
            {actionLabel}
          </Fab>
        </CardActions>
      </Card>

        {/*** Modal to display book ifomations  */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ maxWidth: 500, margin: 'auto', mt: 10, p: 2, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 2 }}>
          <CardMedia
            component="img"
            height="300"
            image={require(`../${book.coverPhotoURL}`)}
            alt={book.title}
            sx={{ borderRadius: 2, p: 2 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align="center">
              {book.title}
            </Typography>
            <Typography variant="subtitle1" color="text.primary" gutterBottom align="center">
              Author: {book.author}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Reading Level: {book.readingLevel}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Fab variant="extended" size="small" sx={{ backgroundColor: '#FABD33', color: 'black' }} onClick={() => actionHandler(book)}>
              {icon}
              {actionLabel}
            </Fab>
          </CardActions>
        </Box>
      </Modal>
    </>
  );
};

export default BookCard;
