import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

/**
 * Customizable link to be rendered inside the SideMenu
 *
 * @param {String} children Text of the link
 * @param {Element} icon Icon for the filter
 * @param {Function} onClick Handles clicking on the link
 */
const FilterLink = ({ children, icon, onClick }) => (
  <ListItem onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText>{children}</ListItemText>
  </ListItem>
);

export default FilterLink;
