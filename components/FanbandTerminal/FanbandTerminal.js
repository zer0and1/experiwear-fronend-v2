import { memo, useCallback, useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core";
import { TERMINAL_DISPLAY, TERMINAL_FRAMEWORK } from "utils/constants";
import { FLASHING_PATTERN } from "./constants";
import { quadOut } from "./helper";

const useStyles = makeStyles(() => ({
  root: {
    width: 150,
    height: 308,
    backgroundImage: `url(${TERMINAL_FRAMEWORK})`,
    backgroundSize: 'cover',
    padding: '50px 20px 56px 25px',
  },
  display: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  svg: {
    width: 0,
    height: 0,
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    clipPath: `url(#clip-path)`,
    opacity: 0.8,
    filter: 'blur(12px)',
    background: props => `radial-gradient(ellipse at top 10% left 0, ${props.topLight1}, transparent 50%), radial-gradient(ellipse at bottom 10% left 0, ${props.bottomLight1}, transparent 50%),
      radial-gradient(ellipse at top 0px left 50%, ${props.topLight2}, transparent 60%), radial-gradient(ellipse at bottom 0px left 50%, ${props.bottomLight2}, transparent 60%),
      radial-gradient(ellipse at top 10% left 80px, ${props.topLight3}, transparent 50%), radial-gradient(ellipse at bottom 10% left 80px, ${props.bottomLight3}, transparent 50%)`,
  },
}));

const FanbandTerminal = ({ topLight1, topLight2, topLight3, bottomLight1, bottomLight2, bottomLight3 }) => {
  const [{ timeoutId }, setFlash] = useState({ counter: 0, intervalId: 0, timeoutId: 0, prevState: [0, 1, 1, 1, 1, 1, 1] });
  const [lightState, setLightState] = useState({ timer: 0 });
  const classes = useStyles({ ...lightState });

  const flashLight = useCallback(() => setFlash(({ counter, intervalId, timeoutId, prevState: [, pt1, pt2, pt3, pb1, pb2, pb3] }) => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);

    const [duration, top1, top2, top3, bottom1, bottom2, bottom3] = FLASHING_PATTERN[counter];
    const newIntervalId = setInterval(() => {
      setLightState(({ timer }) => ({
        topLight1: fade(topLight1, pt1 - (pt1 - top1) * quadOut(timer / duration)),
        topLight2: fade(topLight2, pt2 - (pt2 - top2) * quadOut(timer / duration)),
        topLight3: fade(topLight3, pt3 - (pt3 - top3) * quadOut(timer / duration)),
        bottomLight1: fade(bottomLight1, pb1 - (pb1 - bottom1) * quadOut(timer / duration)),
        bottomLight2: fade(bottomLight2, pb2 - (pb2 - bottom2) * quadOut(timer / duration)),
        bottomLight3: fade(bottomLight3, pb3 - (pb3 - bottom3) * quadOut(timer / duration)),
        timer: timer >= duration ? 0 : timer + 20,
      }));
    }, 20);

    const newTimeoutId = setTimeout(flashLight, duration);

    return {
      counter: counter === FLASHING_PATTERN.length - 1 ? 0 : counter + 1,
      intervalId: newIntervalId,
      prevState: FLASHING_PATTERN[counter],
      timeoutId: newTimeoutId,
    }
  }), [topLight1, topLight2, topLight3, bottomLight1, bottomLight2, bottomLight3]);

  useEffect(() => {
    clearTimeout(timeoutId);
    flashLight();
    // eslint-disable-next-line
  }, [topLight1, topLight2, topLight3, bottomLight1, bottomLight2, bottomLight3]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.gradient} />
        <svg className={classes.svg}>
          <clipPath id="clip-path" clipPathUnits="objectBoundingBox">
            <path d="M0.332,0.996 C0.144,0.979,0.05,0.892,0.009,0.682 C0,0.633,0,0.376,0.009,0.325 C0.025,0.244,0.049,0.158,0.101,0.1 C0.176,0.007,0.372,0.001,0.386,0.001 C0.474,0,0.464,0,0.542,0 C0.74,0,0.851,0.03,0.918,0.119 C0.956,0.16,0.978,0.237,0.995,0.327 C1,0.376,1,0.63,0.995,0.679 C0.979,0.764,0.948,0.831,0.925,0.867 C0.905,0.893,0.841,0.984,0.623,0.999 L0.609,0.999 L0.494,1 C0.427,1,0.389,1,0.361,0.998"></path>
          </clipPath>
        </svg>
        <img className={classes.display} src={TERMINAL_DISPLAY} />
      </div>
    </div>
  )
};

export default memo(FanbandTerminal);