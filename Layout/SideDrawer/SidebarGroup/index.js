import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core'
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  list: {
  },
  header: {
    padding: theme.spacing(1, 0.5),
    color: theme.custom.palette.lightGrey
  }
}));

const SidebarGroup = ({ title, items }) => {
  const classes = useStyles();

  return (
    <List
      className={classes.list}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" className={classes.header}>
          {title}
        </ListSubheader>
      }
    >
      {items.map(({ title, icon: MenuIcon }, idx) =>
        <ListItem
          key={idx}
          button
          className={clsx(classes.listItem, { [classes.selectedItem]: false })}
        >
          <ListItemIcon className={classes.menuIcon}>
            <MenuIcon isActive={false} />
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      )}
    </List>
  );
}

export default memo(SidebarGroup);