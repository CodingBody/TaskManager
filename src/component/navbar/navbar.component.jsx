import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Paper, Fab } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import HistoryIcon from "@material-ui/icons/History";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import ForumIcon from "@material-ui/icons/Forum";
import TimeToLeaveIcon from "@material-ui/icons/TimeToLeave";
import SettingsIcon from "@material-ui/icons/Settings";
import { useStyles } from "./navbar.styles";
import StartPage from "../../pages/startpage/startpage.component";
import { Route, Switch, withRouter } from "react-router-dom";
import SignInForm from "../signInForm/signInForm.component";
import TodoPage from "../../pages/todoPage/todoPage.component";
import TodoForm from "../todoForm/todoForm.component";
import InfoIcon from "@material-ui/icons/Info";
import SignUpForm from "../signUpForm/signUpForm.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/auth/auth.selectors";
import { connect } from "react-redux";
import ProfileIcon from "./navbarMaterials/profileIcon.component";
import { selectStep } from "../../redux/async/async.selectors";
import { setTodoFormStepToZero } from "../../redux/async/async.actions";
import TodayPage from "../../pages/todayPage/todayPage.component";
import { format } from "date-fns";
import CalendarPage from "./../../pages/calendarPage/calendarPage.component";
import LoadingComponent from "./../loader/loadingCompoent";
import {
  selectMonthlyTodo,
  selectTimer,
  selectCurrentTask
} from "./../../redux/todo/todo.selectors";
import ThisWeekPage from "../../pages/thisWeekPage/thisWeekPage.component";
import { getThisWeek } from "../../utils/helper";
import {
  getWeeklyTodoStart,
  openTimer,
  closeTimer
} from "../../redux/todo/todo.actions";
import { selectLoading } from "./../../redux/async/async.selectors";
import SmallLoader from "./../loader/SmallLoader";
import Timer from "../timer/Timer";

const Navbar = props => {
  const {
    container,
    loading,
    user,
    todos,
    currentTask,
    openTimer,
    closeTimer,
    timer,
    getWeeklyTodo
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const today = format(new Date(), "MMMd");

  const thisWeek = getThisWeek();

  const onClickThisWeek = () => {
    getWeeklyTodo(thisWeek);
    console.log(" runneddddd");
    props.history.push(`/todo/thisWeek/${thisWeek}`);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Avatar alt="logo" src="/assets/logo.png" className={classes.logo} />
        <Typography variant="h6" style={{ margin: "1vw 0 0 4vw" }}>
          My Motivator
        </Typography>
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <PlayCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText
            onClick={() => props.history.push(`/todo/dailyTodo/${today}`)}
            primary="Today"
          />
        </ListItem>
        <ListItem onClick={onClickThisWeek} button>
          <ListItemIcon>
            <PlaylistAddCheckIcon />
          </ListItemIcon>
          <ListItemText primary="This week" />
        </ListItem>
        <ListItem onClick={() => props.history.push("/todo/calendar")} button>
          <ListItemIcon>
            <PlaylistAddCheckIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="People" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TimeToLeaveIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          {user ? (
            <Typography
              style={{
                fontSize: "1.1rem"
              }}
              variant="h6"
              noWrap
            >
              Welcome ! {user.displayName}
            </Typography>
          ) : (
            <Typography
              style={{
                fontSize: "1.1rem"
              }}
              variant="h6"
              noWrap
            >
              Welcome !
            </Typography>
          )}
          {user ? <ProfileIcon classes={classes} /> : <SignInForm />}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <Paper className={classes.content}>
        <React.Fragment>
          {user ? (
            <React.Fragment>
              <Switch>
                <Route
                  exact
                  path="/start"
                  render={() => (user ? <TodoPage /> : <StartPage />)}
                />

                <Route
                  exact
                  path="/todo/thisWeek/:thisWeek"
                  component={ThisWeekPage}
                />

                <Route exact path="/todo/calendar" component={CalendarPage} />
                <Route
                  exact
                  path="/todo/dailyTodo/:monthAndDate"
                  component={TodayPage}
                />
              </Switch>
              <TodoForm />

              <SignUpForm />
              {currentTask ? (
                <Timer openTimer={timer} closeTimer={closeTimer} />
              ) : null}
              <Fab className={classes.timerContainer} onClick={openTimer}>
                hello
              </Fab>
            </React.Fragment>
          ) : (
            <SmallLoader />
          )}
        </React.Fragment>
      </Paper>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  user: selectCurrentUser,
  activeStep: selectStep,
  todos: selectMonthlyTodo,
  timer: selectTimer,
  currentTask: selectCurrentTask
});

const mapDispatchToProps = dispatch => ({
  setStepToZero: () => dispatch(setTodoFormStepToZero()),
  getWeeklyTodo: formattedWeek => dispatch(getWeeklyTodoStart(formattedWeek)),
  openTimer: () => dispatch(openTimer()),
  closeTimer: () => dispatch(closeTimer())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
