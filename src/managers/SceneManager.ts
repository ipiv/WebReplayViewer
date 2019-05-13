import { PerspectiveCamera, Scene } from "three"

import ArenaModel from "../loaders/glb-models/ArenaModel"
import BallModel from "../loaders/glb-models/BallModel"
import { PlayerManager } from "./PlayerManager"
import { addToWindow } from "../utils/addToWindow"

interface SceneManagerOptions {
  scene: Scene
  ball: BallModel
  arena: ArenaModel
  players: PlayerManager[]
}

export default class SceneManager {
  scene: Scene
  camera: PerspectiveCamera
  ball: BallModel
  arena: ArenaModel
  players: PlayerManager[]

  private constructor({ scene, ball, arena, players }: SceneManagerOptions) {
    this.camera = new PerspectiveCamera(80, 2, 0.1, 20000)
    this.camera.position.z = 5000
    this.camera.position.y = 750
    this.scene = scene
    this.ball = ball
    this.arena = arena
    this.players = players

    addToWindow("arena", arena)
  }

  updateSize(width: number, height: number) {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  setCameraLocation({ playerName, fieldLocation }: CameraLocationOptions) {
    this.players.forEach(player => player.removeCamera())
    if (playerName) {
      const player = this.players.find(
        player => player.getName() === playerName
      )
      if (player) {
        player.makeActive(this.camera)
      }
    } else if (fieldLocation) {
      switch (fieldLocation) {
        case "orange":
          this.camera.position.z = 5750
        case "blue":
          this.camera.position.z = -5750
        case "center":
          this.camera.position.z = 0
      }
    }
  }

  /**
   * ========================================
   * Managers are singletons
   * ========================================
   */
  private static instance?: SceneManager
  static getInstance() {
    if (!SceneManager.instance) {
      throw new Error("SceneManager not initialized with call to `init`")
    }
    return SceneManager.instance
  }
  static init(options: SceneManagerOptions) {
    SceneManager.instance = new SceneManager(options)
    return SceneManager.instance
  }
}

type CameraLocationOptions = {
  playerName?: string
  fieldLocation?: "orange" | "blue" | "center"
}