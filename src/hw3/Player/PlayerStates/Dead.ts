import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { PlayerTweens,PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import { HW3Events } from "../../HW3Events";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";

/**
 * The Dead state for the player's FSM AI. 
 */
export default class Dead extends PlayerState {

    // Trigger the player's death animation when we enter the dead state
    public onEnter(options: Record<string, any>): void {
        // this.owner.tweens.play(PlayerTweens.DEATH);
        let dyingAudio = this.owner.getScene().getDyingAudioKey();
        this.owner.animation.play(PlayerAnimations.DYING_RIGHT);
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: dyingAudio, loop: false, holdReference: false});

        this.owner.animation.queue(PlayerAnimations.DEAD_RIGHT, false, HW3Events.PLAYER_DEAD);
    }

    // Ignore all events from the rest of the game
    public handleInput(event: GameEvent): void { }

    // Empty update method - if the player is dead, don't update anything
    public update(deltaT: number): void {}

    public onExit(): Record<string, any> { 
        this.owner.animation.stop();
        return {}; 
    }
    
}