import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'

export default function Livermore() {
  return (
    <Box>
      <Typography gutterBottom variant='h6' style={{ textAlign: 'center' }}>
        Jesse Livermore
      </Typography>
      <CardMedia
        image='https://pbs.twimg.com/profile_images/1202370756/jesse_livermore.jpg'
        title='Jesse Livermore'
        component='img'
      />
      <Typography paragraph variant='caption' style={{ paddingTop: 5 }}>
        “Watch the Market leaders, the stocks that have led the charge upward in
        a bull market [...] as the leaders go, so goes the entire market.”
      </Typography>
    </Box>
  )
}
