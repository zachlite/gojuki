function Keyboard() {

    this.is_pressed = {};

    var left, right, up, down;

    document.onkeydown = function(e) {
        if (e.keyCode === 39) right = true;
        if (e.keyCode === 37) left = true;
        if (e.keyCode === 38) up = true;
        if (e.keyCode === 40) down = true;
    };

    document.onkeyup = function(e) {
        if (e.keyCode === 39) right = false;
        if (e.keyCode === 37) left = false;
        if (e.keyCode === 38) up = false;
        if (e.keyCode === 40) down = false;
    };

    Object.defineProperty(this.is_pressed, 'left', {
        get: function() { return left; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(this.is_pressed, 'right', {
        get: function() { return right; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(this.is_pressed, 'up', {
        get: function() { return up; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(this.is_pressed, 'down', {
        get: function() { return down; },
        configurable: true,
        enumerable: true
    });

    return this;

}

export default new Keyboard();