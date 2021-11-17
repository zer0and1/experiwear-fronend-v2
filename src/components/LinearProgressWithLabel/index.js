import { Box, LinearProgress, Typography } from '@material-ui/core';

const normalise = (value, max, min = 0) =>
  ((value - min) * 100) / (max - min) || 0;

export function LinearProgressWithLabel(props) {
  const processedProps = {
    ...props,
    value: normalise(props.value, props.max),
    max: props.max,
  };
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...processedProps} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          processedProps.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
