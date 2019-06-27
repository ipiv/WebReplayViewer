import { Grid, WithStyles, withStyles } from "@material-ui/core"
import React, { Component } from "react"

import {
  FieldCameraControls,
  GameBuilderOptions,
  GameManager,
  GameManagerLoader,
  PlayControls,
  PlayerCameraControls,
  ReplayViewer,
  Slider,
} from "../../../src"

interface Props extends WithStyles {
  options: GameBuilderOptions
}

interface State {
  gameManager?: GameManager
}

class Viewer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  renderContent() {
    const { gameManager } = this.state
    const { root } = this.props.classes

    if (!gameManager) {
      return "Food machine broke..."
    }

    return (
      <Grid
        container
        className={root}
        direction="column"
        justify="center"
        spacing={24}
      >
        <Grid item style={{ minHeight: 0, maxWidth: 900, width: "100%" }}>
          <ReplayViewer gameManager={gameManager} />
        </Grid>
        <Grid item>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={24}
          >
            <Grid item>
              <PlayControls />
            </Grid>
            <Grid item>
              <FieldCameraControls />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <PlayerCameraControls />
        </Grid>
        <Grid item>
          <Slider />
        </Grid>
      </Grid>
    )
  }

  render() {
    const { options } = this.props
    const onLoad = (gm: GameManager) => this.setState({ gameManager: gm })
    return (
      <GameManagerLoader options={options} onLoad={onLoad}>
        {this.renderContent()}
      </GameManagerLoader>
    )
  }
}

export default withStyles({
  root: {
    "&& > div:nth-child(even)": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  },
})(Viewer)