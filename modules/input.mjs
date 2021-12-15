class Input {
    constructor(player, keys = { left: 'a', right: 'd', up: 'w' }) {
        this.player = player;
        this.keys = keys;

        this.events = {};

        this.sound = new Audio('./assets/sound/jump.wav');
        this.soundWalk = new Audio('./assets/sound/walk.wav');

        this.events[keys.left] = {
            down: false, event: () => {
                this.player.vel.x += -1;
                
                if (this.player.touch.bottom) {
                    this.soundWalk.play();
                }
            }
        };
        this.events[keys.right] = {
            down: false, event: () => {
                this.player.vel.x += 1;
                
                if (this.player.touch.bottom) {
                    this.soundWalk.play();
                }
            }
        };
        this.events[keys.up] = {
            down: false, event: () => {
                if (this.player.touch.bottom) this.player.vel.y = -12;
                
                if (this.player.touch.bottom)  {
                    this.sound.currentTime = 0;
                    this.sound.play();
                }
            }
        };

        document.addEventListener('keydown', e => {
            if (this.events[e.key.toLowerCase()] !== undefined) this.events[e.key.toLowerCase()].down = true;
        });

        document.addEventListener('keyup', e => {
            if (this.events[e.key.toLowerCase()] !== undefined) this.events[e.key.toLowerCase()].down = false;
        });
    }

    check() {
        for (let key in this.events) {
            if (this.events[key].down) this.events[key].event();
        }
    }
}

export { Input };