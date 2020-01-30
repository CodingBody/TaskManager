import React from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TextField, Paper, Divider } from "@material-ui/core";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import { toggleSignUpForm } from "./../../redux/auth/auth.actions";
import { createStructuredSelector } from "reselect";
import { selectToggleSignUpForm } from "./../../redux/auth/auth.selectors";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(0, 4),
    overflowY: "auto",
    height: "55vh",
    width: "30vw"
  },
  googleIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const SignUpForm = ({ open, setOpen }) => {
  const [form, setForm] = React.useState({
    displayName: "",
    email: "",
    password: ""
  });

  const handleChange = name => ({ target: { value } }) =>
    setForm({
      ...form,
      [name]: value
    });

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Sign Up</DialogTitle>
        <Divider />
        <Paper className={classes.paper}>
          <form>
            <TextField
              variant="outlined"
              id="outlined-basic"
              type="text"
              value={form.displayName}
              label="displayName"
              margin="normal"
              onChange={handleChange("displayName")}
              fullWidth
            />
            <br />
            <TextField
              variant="outlined"
              id="outlined-basic"
              type="email"
              value={form.email}
              label="Email"
              margin="normal"
              onChange={handleChange("email")}
              fullWidth
            />
            <br />

            <TextField
              variant="outlined"
              id="outlined-basic"
              type="password"
              value={form.password}
              label="Password"
              margin="normal"
              onChange={handleChange("password")}
              fullWidth
            />
          </form>
          <DialogActions style={{ marginBottom: 15 }}>
            <Button
              className={classes.button}
              size="large"
              color="primary"
              variant="outlined"
            >
              Sign in
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  open: selectToggleSignUpForm
});

const mapDispatchToProps = dispatch => ({
  setOpen: () => dispatch(toggleSignUpForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
