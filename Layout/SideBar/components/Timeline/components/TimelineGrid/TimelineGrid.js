import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  slot: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slotLabel: {
    fontFamily: theme.custom.fonts.SFUITextRegular,
    fontSize: 12,
    color: '#787d93',
    width: 32,
    marginRight: 23,
  },
  slotLine: {
    width: 'calc(100% - 55px)',
    height: 1,
    backgroundColor: '#e8e9ed',
  },
}));

const TimelineGrid = () => {
  const classes = useStyles();

  return (
    <>
      {Array.from({ length: 24 }).map((_, idx) => (
        <div key={idx} className={classes.slot} style={{ top: idx * 72 }}>
          <div className={classes.slotLabel}>
            {`${idx - (idx > 12 ? 12 : 0)}${idx === 12 ? 'PM' : ':00'}`}
          </div>
          <div className={classes.slotLine} />
        </div>
      ))}
    </>
  )
};

export default TimelineGrid;