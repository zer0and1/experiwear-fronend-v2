import { Grid } from "@material-ui/core";
import { TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH } from "utils/constants/image-paths";
import { GameSelector, PathIndicator } from "./components";


const AppBar = () => {

  return (
    <Grid container alignItems="center">
      <Grid item xs={5}>
        <PathIndicator />
      </Grid>

      <Grid item xs={2}>
        <img src={TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH} width={38} height={40} />
      </Grid>

      <Grid item xs={5}>
        <GameSelector />
      </Grid>
    </Grid>
  )
};

export default AppBar;