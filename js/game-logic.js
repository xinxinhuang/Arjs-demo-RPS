// Model optimization component
AFRAME.registerComponent('model-manager', {
    init: function() {
        this.el.addEventListener('model-loaded', () => {
            const mesh = this.el.getObject3D('mesh');
            if (mesh) {
                mesh.traverse((node) => {
                    if (node.isMesh) {
                        node.frustumCulled = true;
                        node.matrixAutoUpdate = false;
                        if (node.material) {
                            node.material.precision = 'lowp';
                        }
                    }
                });
            }
        });
    }
});

// Game logic component
AFRAME.registerComponent('rps-game', {
    init: function() {
        this.activeMarkers = new Set();
        this.gameState = {
            lastWinner: null,
            lastLoser: null
        };

        document.querySelectorAll('a-marker').forEach(marker => {
            marker.addEventListener('markerFound', () => {
                this.activeMarkers.add(marker.id);
                if (this.activeMarkers.size === 2) {
                    this.playGame(Array.from(this.activeMarkers));
                }
            });

            marker.addEventListener('markerLost', () => {
                this.activeMarkers.delete(marker.id);
                this.resetModel(marker.id);
            });
        });
    },

    playGame: function(activeMarkers) {
        const [marker1, marker2] = activeMarkers;
        const result = this.determineWinner(marker1, marker2);
        
        if (result) {
            this.animateResult(result.winner, result.loser);
        }
    },

    determineWinner: function(marker1, marker2) {
        const rules = {
            'rock': { beats: 'scissors' },
            'paper': { beats: 'rock' },
            'scissors': { beats: 'paper' }
        };

        if (rules[marker1]?.beats === marker2) {
            return { winner: marker1, loser: marker2 };
        } else if (rules[marker2]?.beats === marker1) {
            return { winner: marker2, loser: marker1 };
        }
        return null;
    },

    animateResult: function(winnerId, loserId) {
        const winnerEntity = document.querySelector(`#${winnerId}-model`);
        const loserEntity = document.querySelector(`#${loserId}-model`);

        // Reset any existing animations
        winnerEntity.removeAttribute('animation__bounce1');
        winnerEntity.removeAttribute('animation__bounce2');
        winnerEntity.removeAttribute('animation__bounce3');
        winnerEntity.removeAttribute('animation__bounce4');
        
        // First bounce - Up
        winnerEntity.setAttribute('animation__bounce1', {
            property: 'scale',
            from: '2 2 2',
            to: '4 4 4',
            dur: 500,
            easing: 'easeOutQuad'
        });

        // After 500ms, start coming down
        setTimeout(() => {
            winnerEntity.setAttribute('animation__bounce2', {
                property: 'scale',
                from: '4 4 4',
                to: '3 3 3',
                dur: 300,
                easing: 'easeInQuad'
            });
        }, 500);

        // Second bounce
        setTimeout(() => {
            winnerEntity.setAttribute('animation__bounce3', {
                property: 'scale',
                from: '3 3 3',
                to: '3.5 3.5 3.5',
                dur: 400,
                easing: 'easeOutQuad'
            });
        }, 800);

        // Third bounce
        setTimeout(() => {
            winnerEntity.setAttribute('animation__bounce4', {
                property: 'scale',
                from: '3.5 3.5 3.5',
                to: '3 3 3',
                dur: 300,
                easing: 'easeInOutQuad'
            });
        }, 1200);

        // Animate loser to shrink
        loserEntity.setAttribute('animation__scale', {
            property: 'scale',
            to: '1 1 1',
            dur: 1000,
            easing: 'easeOutQuad'
        });

        this.gameState.lastWinner = winnerId;
        this.gameState.lastLoser = loserId;
    },

    resetModel: function(markerId) {
        const entity = document.querySelector(`#${markerId}-model`);
        if (entity) {
            // Remove all bounce animations
            entity.removeAttribute('animation__bounce1');
            entity.removeAttribute('animation__bounce2');
            entity.removeAttribute('animation__bounce3');
            entity.removeAttribute('animation__bounce4');
            
            // Reset to original scale
            entity.setAttribute('animation__scale', {
                property: 'scale',
                to: '2 2 2',
                dur: 500,
                easing: 'easeOutQuad'
            });
        }
    }
}); 