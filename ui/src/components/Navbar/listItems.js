import React,{useCallback} from 'react';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import * as routez from '../../shared/routes';
import { authLogout } from "../../store/actions/index";
import { List } from '@material-ui/core';

import { removeAlert } from '../../store/actions/index';
import Alert from '../../components/UI/FHAlert/FHAlert';

import Users from '../../containers/Users/users';


export const MainListItems = (
  <div>
    <ListItem button >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Stations" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ArrowDropDownCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Weapons" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ArrowForwardIosIcon />
      </ListItemIcon>
      <ListItemText primary="Ammunation" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocationCityIcon />
      </ListItemIcon>
      <ListItemText primary="Companies" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Criminal Weapons" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Criminal Ammunations" />
    </ListItem>
  </div>
);