import React, { useMemo, useState } from 'react';
import { IconButton, makeStyles, Select, Tab, Tabs } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import {
  FHCard,
  FHCardHeader,
  FHCardContent,
  FanbandTable,
  Title,
} from 'components';
import { FANBAND_LABELS, FANBAND_TYPES } from 'utils/constants';
import { useAsyncAction } from 'hooks';
import { getFanbands } from 'redux/actions';
import { useSelector } from 'react-redux';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles({
  tabPanel: {
    flexGrow: 1,
    height: 0,
    overflow: 'auto',
  },
});

const QuickPollAlertSample = () => {
  const classes = useStyles();
  const fanbands = useSelector((state) => state.main.fanbands.results);

  useAsyncAction(getFanbands(), !fanbands.length);

  return (
    <FHCard>
      <FHCardHeader
        title={
          <React.Fragment>
            <IconButton>
              <ArrowBack />
            </IconButton>
            <Title>Quick Poll Alert Sample</Title>
          </React.Fragment>
        }
        action={<Select></Select>}
      />
      <FHCardContent></FHCardContent>
    </FHCard>
  );
};

export default QuickPollAlertSample;
