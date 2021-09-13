import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { logoutUser } from "actions/auth";
import BellIcon from "components/Icons/BellIcon";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    cursor: 'pointer',
  },
  username: {
    fontFamily: 'SFProText-Medium',
    fontSize: 16,
    fontWeight: 500,
    color: '#0f3f62',
    marginLeft: theme.spacing(2),
    letterSpacing: 0.32,
    textTransform: 'capitalize',
  },
}));

const UserAccount = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={classes.root}>
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <Avatar variant="rounded" src={currentUser.avatar} className={classes.avatar} onClick={toggleMenu} />
        <Typography className={classes.username}>
          {`${currentUser.firstName} ${currentUser.lastName}`}
        </Typography>
      </Box>
      <IconButton>
        <Badge variant="dot" color="primary">
          <BellIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem className={classes.item} onClick={handleLogout}>
          Log out
        </MenuItem>
      </Menu>
    </div>
  )
};

export default UserAccount;