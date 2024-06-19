// jump-controls.js

AFRAME.registerComponent('jump-controls', {
    schema: {
        distance: { type: 'number', default: 5 }
    },

    init: function () {
        this.isJumping = false;
        this.velocity = new THREE.Vector3();
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    },

    tick: function (time, timeDelta) {
        const el = this.el;
        if (this.isJumping) {
            this.velocity.y -= 9.8 * timeDelta / 1000;
            el.object3D.position.add(this.velocity.clone().multiplyScalar(timeDelta / 1000));
            if (el.object3D.position.y <= 1.6) {
                el.object3D.position.y = 1.6;
                this.isJumping = false;
                this.velocity.set(0, 0, 0);
            }
        }
    },

    onKeyDown: function (evt) {
        if (evt.code === 'Space' && !this.isJumping) {
            this.isJumping = true;
            this.velocity.set(0, this.data.distance, 0);
        }
    }
});
