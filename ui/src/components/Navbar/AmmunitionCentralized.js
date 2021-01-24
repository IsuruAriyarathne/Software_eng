import React,{useCallback} from 'react';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";


import clsx from 'clsx';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BallotIcon from '@material-ui/icons/Ballot';
import AssignmentIcon from '@material-ui/icons/Assignment';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import * as routez from '../../shared/routes';
import { authLogout } from "../../store/actions/index";

import AmmunitionCentralized from '../../containers/AmmunitionCentralized/AmmunitionCentralized';

import { removeAlert } from '../../store/actions/index';
import Alert from '../../components/UI/FHAlert/FHAlert';

import Users from '../../containers/Users/users';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    backgroundColor: grey[800],
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: grey[800],
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  papernav: {
    height: '100%',
    backgroundColor: grey[300],
  },
  menuButtonlog: {
    color: "white"
  }
  // fixedHeight: {
  //   height: '100%',
  // },
}));

function Dashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { onauthLogout, isAuthenticated } = props;

    const handleLogout = () => {
		onauthLogout();
		history.push("/");
   };
   
  const removeAlert = props.removeAlert;
  const handleAlertClose = useCallback((alertId) => {
      removeAlert(alertId);
  }, [removeAlert]);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            SLFire
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List  className={classes.papernav}>
          <ListItem button onClick={() => history.push(`${routez.COMPANIES}`)}>
            <ListItemIcon>
              <ArrowDropDownCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Companies" />
          </ListItem>
          <ListItem button onClick={() => history.push(`${routez.AMMUNATIONSCEN}`)}>
            <ListItemIcon>
              <ArrowDropDownCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Ammunitions" />
          </ListItem>
          <ListItem button onClick={() => history.push(`${routez.WEAPONSCEN}`)}>
            <ListItemIcon>
              <ArrowDropDownCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Weapons" />
          </ListItem>
          <ListItem button onClick={() => history.push(`${routez.WEAPONMODELS}`)}>
            <ListItemIcon>
              <ArrowDropDownCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Weapon Moedls" />
          </ListItem>
          <ListItem button onClick={() => history.push(`${routez.AMMUNITIONMODELS}`)}>
            <ListItemIcon>
              <ArrowDropDownCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Ammunition Models" />
          </ListItem>
          <ListItem button onClick={() => history.push(`${routez.CENRECOVERY}`)}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Recovery" />
          </ListItem>
          <ListItem button onClick={() => history.push(`${routez.CENMAINTENANCE}`)}>
            <ListItemIcon>
              <BallotIcon />
            </ListItemIcon>
            <ListItemText primary="Maintenance" />
          </ListItem>
          <ListItem button onClick={() => history.push(`${routez.CENSTATIONS}`)}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Stations" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
                <AmmunitionCentralized />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token != null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onauthLogout: () => dispatch(authLogout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
