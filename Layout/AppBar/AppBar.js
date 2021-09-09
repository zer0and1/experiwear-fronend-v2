import { Box, Grid } from "@material-ui/core";
import { GameSelector, PathIndicator } from "./components";


const AppBar = () => {

  return (
    <Grid container>
      <Grid item xs={5}>
        <PathIndicator />
      </Grid>

      <Grid item xs={2}>

      </Grid>

      <Grid item xs={5}>
        <GameSelector />
      </Grid>
    </Grid>
  )
};

export default AppBar;