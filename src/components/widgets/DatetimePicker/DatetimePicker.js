import { memo } from 'react';
import { Box, Popover } from '@material-ui/core';
import { Calendar, Title } from 'components';
import { useSelector } from 'react-redux';

const DatetimePicker = ({ anchorEl, onClose }) => {
  const cellData = useSelector((state) => state.notifications.alertStatus);

  return (
    <Popover
      onClose={onClose}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box p={2}>
        <Title mb={4}>Date</Title>
        <Calendar cellData={cellData} minimized mb={4} />
      </Box>
    </Popover>
  );
};

export default memo(DatetimePicker);
