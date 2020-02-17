import React, { useState } from 'react';
import { OptionsTable } from 'components';
import { activeOptionsPull } from '../../services/activeOptionsPull';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import $ from 'jquery';

export const ActiveOptions = () => {
  const style = {
    jumbotron: {
      background: '#3f51b5',
      backgroundSize: 'cover',
      backgroundColor: '#4682B4',
      color: 'white',
    },
  };
  const [optionsData, setOptionsData] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [searchTermConst, setSearchTermConst] = useState();

  const handleOptionSearch = e => {
    e.preventDefault();
    try {
      console.log(searchTerm);
      activeOptionsPull(searchTerm).then(data => {
        setOptionsData(data);
      });
      setSearchTermConst(searchTerm.toUpperCase());
      $('.search_input').val('');
    } catch (err) {
      alert('stock ticker not found - ' + err);
    }
  };

  return (
    <>
      <Grid item style={style.jumbotron}>
        <Box>
          <Typography variant='h4'>Active Options Dashboard</Typography>
        </Box>
      </Grid>
      <Grid item>
        <div className='searchbar'>
          <input
            onChange={e => {
              setSearchTerm(e.target.value);
              console.log(searchTerm);
            }}
            className='search_input'
            type='text'
            name=''
            placeholder='Search...'
          />
          <a onClick={handleOptionSearch} href='#' className='search_icon'>
            <i className='fas fa-search'></i>
          </a>
        </div>
      </Grid>
      <Grid item>
        {!optionsData ? (
          <>
            <h2 style={{ textAlign: 'center' }}>
              Enter a ticker to see today's most actively traded options
            </h2>
            <br></br>
            <h6 style={{ textAlign: 'center', fontStyle: 'italic' }}>
              This feature is unavailable outside of options market hours
            </h6>
            <h6 style={{ textAlign: 'center', fontStyle: 'italic' }}>
              If no results are returned during market hours, the ticker may be
              illiquid, or not yet actively trading for the day
            </h6>
          </>
        ) : (
          <>
            <h1 style={{ textAlign: 'center' }}>{searchTermConst}</h1>
            <OptionsTable optionsData={optionsData} />
          </>
        )}
      </Grid>
    </>
  );
};
