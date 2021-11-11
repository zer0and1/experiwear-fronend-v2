import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Box, fade, makeStyles } from "@material-ui/core";
import { TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH, TERMINAL_ATL, TERMINAL_BATTERY, TERMINAL_DISPLAY, TERMINAL_FRAMEWORK, TERMINAL_HAWKS, TERMINAL_LINK } from "utils/constants";
import { FLASHING_PATTERN } from "./constants";
import { quadOut } from "./helper";

const useStyles = makeStyles(() => ({
   
  framework: {
    width: 150,
    height: 308,
    backgroundImage: `url(${TERMINAL_FRAMEWORK})`,
    backgroundSize: 'cover',
    padding: '50px 20px 56px 25px',
  },
  displayContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundImage: `url(${TERMINAL_DISPLAY})`,
    backgroundSize: '100% 100%',
  },
  display: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '12px 8px',
  },
  hawksIcon: {
    height: 50,
    marginBottom: 8,
  },
  clipPathSvg: {
    width: 0,
    height: 0,
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    clipPath: `url(#clip-path)`,
    filter: 'blur(12px)',
    zIndex: 1,
    background: props => `url(${TERMINAL_DISPLAY}) 100% 100%, radial-gradient(ellipse at top 10% left 0, ${props.tColor1}, transparent 50%), radial-gradient(ellipse at bottom 10% left 0, ${props.bColor1}, transparent 50%),
      radial-gradient(ellipse at top 0px left 40%, ${props.tColor2}, transparent 60%), radial-gradient(ellipse at bottom 0px left 50%, ${props.bColor2}, transparent 60%),
      radial-gradient(ellipse at top 10% left 80%, ${props.tColor3}, transparent 50%), radial-gradient(ellipse at bottom 10% left 80px, ${props.bColor3}, transparent 50%)`,
  },
  vibrate_no: {
    fontSize: 10
  },
  vibrate_low: {
    animationDuration: props => `${props.style}s`,
    animationName: '$vibrate_low',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: props => parseInt(props.duration),
  },
  vibrate_medium: {
    animationDuration: props => `${props.style}s`,
    animationName: '$vibrate_medium',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: props => parseInt(props.duration),
  },
  vibrate_high: {
    animationDuration: '0.1s',
    animationName: '$vibrate_high',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: props => parseInt(props.duration),
  },
  '@keyframes vibrate_low': {
    '0%': { transform: 'translate(0.5px, 0.5px) rotate(0deg)' },
    '10%': { transform: 'translate(-0.5px, -1px) rotate(-1deg)' },
    '20%': { transform: 'translate(-1.5px, 0px) rotate(1deg)' },
    '30%': { transform: 'translate(1.5px, 1px) rotate(0deg)' },
    '40%': { transform: 'translate(0.5px, -0.5px) rotate(1deg)' },
    '50%': { transform: 'translate(-0.5px, 1px) rotate(-1deg)' },
    '60%': { transform: 'translate(-1.5px, 0.5px) rotate(0deg)' },
    '70%': { transform: 'translate(1.5px, 0.5px) rotate(-1deg)' },
    '80%': { transform: 'translate(-0.5px, -0.5px) rotate(1deg)' },
    '90%': { transform: 'translate(0.5px, 1px) rotate(0deg)' },
    '100%': { transform: 'translate(0.5px, -1px) rotate(-1deg)' },
  },
  '@keyframes vibrate_medium': {
    '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
    '10%': { transform: 'translate(-1px, -2px) rotate(-2deg)' },
    '20%': { transform: 'translate(-3px, 0px) rotate(2deg)' },
    '30%': { transform: 'translate(13px, 2px) rotate(0deg)' },
    '40%': { transform: 'translate(1px, -1px) rotate(2deg)' },
    '50%': { transform: 'translate(-1px, 2px) rotate(-2deg)' },
    '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
    '70%': { transform: 'translate(3px, 1px) rotate(-2deg)' },
    '80%': { transform: 'translate(-1px, -1px) rotate(2deg)' },
    '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
    '100%': { transform: 'translate(1px, -2px) rotate(-2deg)' },
  },
  '@keyframes vibrate_high': {
    '0%': { transform: 'translate(2px, 2px) rotate(0deg)' },
    '10%': { transform: 'translate(-2px, -4px) rotate(-4deg)' },
    '20%': { transform: 'translate(-6px, 0px) rotate(4deg)' },
    '30%': { transform: 'translate(6px, 4px) rotate(0deg)' },
    '40%': { transform: 'translate(2px, -2px) rotate(4deg)' },
    '50%': { transform: 'translate(-2px, 4px) rotate(-4deg)' },
    '60%': { transform: 'translate(-6px, 2px) rotate(0deg)' },
    '70%': { transform: 'translate(6px, 2px) rotate(-4deg)' },
    '80%': { transform: 'translate(-6px, -2px) rotate(4deg)' },
    '90%': { transform: 'translate(2px, 4px) rotate(0deg)' },
    '100%': { transform: 'translate(2px, -4px) rotate(-4deg)' },
  },
}));

const FanbandTerminal = ({ duration = 0, palette = {}, decoration = null, intensity = null, style = null, mounted = false, children }) => {
  const [, setFlash] = useState({ counter: 0, intervalId: 0, timeoutId: 0, prevState: [0, 1, 1, 1, 1, 1, 1], palette });
  const [lightState, setLightState] = useState({ timer: 0 });
  const classes = useStyles({ ...lightState, duration, intensity, style});
  const rootRef = useRef(null);

  const flashLight = useCallback(() => setFlash(({ counter, intervalId, prevState: [, pt1, pt2, pt3, pb1, pb2, pb3], palette }) => {
    clearInterval(intervalId);

    setLightState(state => ({ ...state, timer: 0 }));
    const [period, top1, top2, top3, bottom1, bottom2, bottom3] = FLASHING_PATTERN[counter];
    const miniStep = 50;
    const newIntervalId = setInterval(() => {
      setLightState(({ timer }) => ({
        tColor1: fade(palette.topLight1, pt1 - (pt1 - top1) * quadOut(timer / period)),
        tColor2: fade(palette.topLight2, pt2 - (pt2 - top2) * quadOut(timer / period)),
        tColor3: fade(palette.topLight3, pt3 - (pt3 - top3) * quadOut(timer / period)),
        bColor1: fade(palette.bottomLight1, pb1 - (pb1 - bottom1) * quadOut(timer / period)),
        bColor2: fade(palette.bottomLight2, pb2 - (pb2 - bottom2) * quadOut(timer / period)),
        bColor3: fade(palette.bottomLight3, pb3 - (pb3 - bottom3) * quadOut(timer / period)),
        timer: timer >= period ? 0 : timer + miniStep,
      }));
    }, miniStep);

    const timeoutId = setTimeout(flashLight, period);
    const newCounter = counter === FLASHING_PATTERN.length - 1 ? 0 : counter + 1;

    return {
      counter: newCounter,
      intervalId: newIntervalId,
      prevState: FLASHING_PATTERN[counter],
      timeoutId,
      palette,
    }
  }), []);

  useEffect(() => {
    setFlash(state => {
      if (!state.timeoutId && decoration) {
        flashLight();
      }
      return state;
    });

    return () => setFlash(state => {
      clearTimeout(state.timeoutId);
      return { ...state, timeoutId: 0 };
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (decoration) {
      setFlash(state => {
        clearInterval(state.intervalId);
        return {
          ...state,
          palette,
          timeoutId: 0,
          counter: 0,
        };
      });
    }
  }, [palette, decoration]);

  useEffect(() => {
    if (rootRef.current && decoration) {
      rootRef.current.style.animation = 'none';
      setTimeout(() => rootRef.current.style.animation = '');
    }
  }, [duration, decoration]);

  return (
    <div className={intensity == 'no' ? classes.vibrate_no : intensity == 'low' ? classes.vibrate_low : intensity == 'medium' ? classes.vibrate_medium: classes.vibrate_high} ref={rootRef}>
      <div className={classes.framework}>
        <div className={classes.displayContainer}>
          <div className={classes.display}>
            {mounted ? (
              <>
                <img src={TERMINAL_LINK} height={12} />
                {children}
                <img src={TERMINAL_BATTERY} height={12} />
              </>
            ) : (
              <>
                <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection="column" mt={3} height={70}>
                  <img src={TERMINAL_ATL} height={40} />
                  <img src={TERMINAL_HAWKS} height={24} />
                </Box>
                <img src={TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH} className={classes.hawksIcon} />
              </>
            )}

          </div>
          <div className={classes.gradient} />
        </div>
      </div>
      <svg className={classes.clipPathSvg}>
        <clipPath id="clip-path" clipPathUnits="objectBoundingBox">
          <path d="M0.332,0.996 C0.144,0.979,0.05,0.892,0.009,0.682 C0,0.633,0,0.376,0.009,0.325 C0.025,0.244,0.049,0.158,0.101,0.1 C0.176,0.007,0.372,0.001,0.386,0.001 C0.474,0,0.464,0,0.542,0 C0.74,0,0.851,0.03,0.918,0.119 C0.956,0.16,0.978,0.237,0.995,0.327 C1,0.376,1,0.63,0.995,0.679 C0.979,0.764,0.948,0.831,0.925,0.867 C0.905,0.893,0.841,0.984,0.623,0.999 L0.609,0.999 L0.494,1 C0.427,1,0.389,1,0.361,0.998"></path>
        </clipPath>
      </svg>
    </div>
  )
};

export default memo(FanbandTerminal);