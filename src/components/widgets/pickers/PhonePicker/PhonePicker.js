import React, { useMemo, useState } from 'react';
import {
  TextField,
  InputAdornment,
  Popover,
  MenuList,
  MenuItem,
  makeStyles,
  InputBase,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import { useAsyncAction } from 'hooks';
import { getFanbands } from 'redux/actions';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  item: {
    fontFamily: theme.custom.fonts.SFProTextBold,
    fontSize: 14,
    color: '#000',
    '&>span': {
      fontFamily: theme.custom.fonts.SFProTextRegular,
    },
  },
  hidden: {
    display: 'none',
  },
  tabPanel: {
    padding: 0,
  },
  inputSearch: {
    padding: theme.spacing(1.5, 3),
  },
}));

const PhonePicker = React.forwardRef(
  ({ error, label, value, placeholder, ...rest }, ref) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchString, setSearchString] = useState('');
    const fanbands = useSelector((state) =>
      state.main.fanbands.results.map((f) => ({
        ...f,
        phone:
          f.phone && f.phone.match(/\d+/g).reduce((acc, t) => acc + t, '+'),
      }))
    );

    const fanbandLabel = useMemo(() => {
      const { phone } = fanbands.find((f) => f.id === value) || {};
      return phone;
    }, [fanbands, value]);

    const filteredFanbands = useMemo(() => {
      return fanbands.filter((f) => f.phone && f.phone.includes(searchString));
    }, [fanbands, searchString]);

    const handleClick = (id) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      ).set;
      nativeInputValueSetter.call(ref.current, id);
      const ev1 = new Event('input', { bubbles: true });
      ref.current.dispatchEvent(ev1);
      setAnchorEl(null);
      setSearchString('');
    };

    const handleSearchChange = (e) => {
      setSearchString(e.target.value);
    };

    const handleSearchKeyPress = (e) => {
      if (e.key === 'Enter' && searchString && filteredFanbands.length) {
        handleClick(filteredFanbands[0].id);
      }
    };

    const handleTogglePicker = (e) => {
      setAnchorEl(e.target);
    };

    useAsyncAction(getFanbands(), !fanbands.length);

    return (
      <React.Fragment>
        <TextField
          label={label}
          helperText={error}
          error={!!error}
          value={value && fanbandLabel}
          placeholder={placeholder}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <KeyboardArrowDownIcon />
              </InputAdornment>
            ),
            readOnly: true,
          }}
          InputLabelProps={{ shrink: true }}
          onClick={handleTogglePicker}
        />
        <TextField
          inputRef={ref}
          {...rest}
          value={value}
          className={classes.hidden}
        />
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <InputBase
            endAdornment={<SearchIcon />}
            classes={{ root: classes.inputSearch }}
            fullWidth
            autoFocus
            value={searchString}
            tabIndex="0"
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
          />

          <MenuList>
            {filteredFanbands.map(({ id, phone }) => (
              <MenuItem
                key={id}
                className={classes.item}
                onClick={() => handleClick(id)}
                selected={id === value}
              >
                {phone}
              </MenuItem>
            ))}
          </MenuList>
        </Popover>
      </React.Fragment>
    );
  }
);

export default PhonePicker;
