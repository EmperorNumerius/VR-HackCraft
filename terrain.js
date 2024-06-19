// terrain.js

const scene = document.querySelector('#scene');
const simplex = new SimplexNoise();

// Function to create terrain chunks with Simplex noise
function createTerrainChunk(x, z) {
    const chunk = document.createElement('a-entity');
    chunk.setAttribute('id', `chunk-${x}-${z}`);
    scene.appendChild(chunk);

    const size = 10;
    const segmentCount = 20;
    const halfSize = size / 2;
    const segmentSize = size / segmentCount;

    for (let i = 0; i < segmentCount; i++) {
        for (let j = 0; j < segmentCount; j++) {
            const plane = document.createElement('a-plane');
            const posX = x + (i * segmentSize) - halfSize;
            const posZ = z + (j * segmentSize) - halfSize;
            const height = simplex.noise2D(posX * 0.1, posZ * 0.1) * 5;

            plane.setAttribute('position', `${posX} ${height} ${posZ}`);
            plane.setAttribute('rotation', '-90 0 0');
            plane.setAttribute('width', segmentSize + 0.1); // Slightly overlap to avoid gaps
            plane.setAttribute('height', segmentSize + 0.1);
            plane.setAttribute('material', 'color: #228B22; side: double');

            chunk.appendChild(plane);

            // Add cubes
            if (Math.random() < 0.1) {
                const cube = document.createElement('a-box');
                cube.setAttribute('position', `${posX} ${height + 0.5} ${posZ}`);
                cube.setAttribute('width', '1');
                cube.setAttribute('height', '1');
                cube.setAttribute('depth', '1');
                cube.setAttribute('material', 'color: #8B4513');
                chunk.appendChild(cube);
            }
        }
    }
}

// Generate initial terrain
createTerrainChunk(0, 0);

// Infinite terrain generation
document.querySelector('a-scene').addEventListener('loaded', () => {
    setInterval(() => {
        const camera = document.querySelector('#camera');
        const camPos = camera.getAttribute('position');
        const chunkX = Math.floor(camPos.x / 10) * 10;
        const chunkZ = Math.floor(camPos.z / 10) * 10;
        const chunkID = `chunk-${chunkX}-${chunkZ}`;

        if (!document.getElementById(chunkID)) {
            createTerrainChunk(chunkX, chunkZ);
        }
    }, 1000);
});
