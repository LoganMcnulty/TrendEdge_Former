import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import ViewListIcon from '@material-ui/icons/ViewList';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import SettingsIcon from '@material-ui/icons/Settings';

export const DrawerList = () => {
  function ListItemLink(props) {
    return <ListItem button component='a' {...props} />;
  }
  return (
    <List>
      <ListItemLink button href='Sector' key='Sector'>
        <ListItemIcon>
          <CheckBoxOutlineBlankIcon />
        </ListItemIcon>
        <ListItemText primary='Sector Dashboard' />
      </ListItemLink>
      <ListItemLink button href='ActiveOptions' key='Options'>
        <ListItemIcon>
          <CheckBoxOutlineBlankIcon />
        </ListItemIcon>
        <ListItemText primary='Search Active Options ' />
      </ListItemLink>

      <Divider />

      <ListItemLink button href='Watchlist' key='Watchlist'>
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary='User Watchlist' />
      </ListItemLink>
      <ListItemLink button href='User' key='User'>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='User Settings' />
      </ListItemLink>

      <Divider />

      <ListItemLink button href='About' key='About'>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary='About Trend Health' />
      </ListItemLink>
    </List>
  );
};
