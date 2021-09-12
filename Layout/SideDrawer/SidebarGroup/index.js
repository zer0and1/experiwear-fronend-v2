import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core'
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(-3),
  },
  header: {
    fontFamily: 'SFProText-Bold',
    fontSize: 14,
    color: '#333',
    padding: theme.spacing(1, 3.5),
  },
  menuIcon: {
    minWidth: 35,
  },
  item: {
    fontFamily: 'SFProText-Regular',
    fontSize: 14,
    color: '#000',
    paddingLeft: theme.spacing(4),
  },
  selectedItem: {
    '& .MuiTypography-root': {
      fontFamily: 'SFProText-Medium',
    },
    backgroundColor: '#f7fafc',
  },
}));

const SidebarGroup = ({ title, items }) => {
  const classes = useStyles();
  const mainPath = useSelector(state => state.aux.pathTokens?.[1].path);
  const router = useRouter();

  const handleItemClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader className={classes.header}>
          {title}
        </ListSubheader>
      }
    >
      {items.map(({ title, path, icon: MenuIcon }, idx) =>
        <ListItem
          key={idx}
          button
          className={clsx(classes.item, { [classes.selectedItem]: path === mainPath })}
          onClick={(e) => handleItemClick(e, path)}
        >
          <ListItemIcon className={classes.menuIcon}>
            <MenuIcon isActive={path === mainPath} />
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      )}
    </List>
  );
}

export default memo(SidebarGroup);