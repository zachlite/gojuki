import Window from "./../utils/Window.js";

function PlayerConfig() {

	var baseSize = 70;

    return {
        "1": {
            "color": "0xE93F3F",
            "startPosition": {x: baseSize / 2.0, y: Window.screen_height - Window.playable_height + 10},
            "basePosition": {x: 0, y: Window.screen_height - Window.playable_height}
        },
        "2": {
            "color": "0x38D183",
            "startPosition": {x: Window.screen_width - (baseSize / 2.0), y: Window.screen_height - Window.playable_height + 10},
            "basePosition": {x: Window.screen_width - baseSize, y: Window.screen_height - Window.playable_height}
        },
        "3": {
            "color": "0x3FD3E9",
            "startPosition": {x: baseSize / 2.0, y: Window.screen_height - baseSize + 10},
            "basePosition": {x: 0, y: Window.screen_height - baseSize}
        },
        "4": {
            "color": "0xE93FDB",
            "startPosition": {x: Window.screen_width - (baseSize / 2.0), y: Window.screen_height - baseSize + 10},
	        "basePosition": {x: Window.screen_width - baseSize, y: Window.screen_height - baseSize}
        },
    }
}

export default new PlayerConfig();