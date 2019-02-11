import { drawScene } from './scene';
import GL from './webgl';
import Shaders from './Shaders/shaders';
import Tetrahedron from './tetrahedron';

export default (id) => {
    const canvas = document.querySelector(`#${id}`);
    if (!canvas) return;

    console.log(canvas.width);
    console.log(canvas.height);

    console.log(window.innerWidth);
    console.log(window.innerHeight);

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Context
    GL.init(gl);

    // Shaders
    const shaders = new Shaders();
    const shaderProgram = shaders.getShaderProgram();

    // Buffers
    const positionBuffer = GL.createBuffer();
    GL.bindBuffer(positionBuffer);

    // Tetrahedron positions
    const tetra = new Tetrahedron(0, 0, 0, 1, Math.sqrt(6) / 3);
    const positions = tetra.getPositions();

    // Buffers
    GL.addBufferData(positions);

    // Loop
    const angle = Math.PI / 400;
    let tetraRotation = 0;
    const render = () => {

        // console.log(canvas.width);
        // console.log(canvas.height);

        drawScene(shaderProgram, positions, tetraRotation);
        tetraRotation += angle;
        requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);
}
