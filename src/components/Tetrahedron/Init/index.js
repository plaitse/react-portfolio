import { mat4 } from 'gl-matrix';

import Tetrahedron from './tetrahedron';
import Locations from './locations';

export default (id) => {
    const canvas = document.querySelector(`#${id}`);
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;


    const vsSource = `
        attribute vec3 ${Locations.POSITION};

        uniform mat4 mWorld;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        void main() {
            gl_Position = uProjectionMatrix * uModelViewMatrix * mWorld * vec4(${Locations.POSITION}, 1.0);
        }
    `;

    const fsSource = `
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    console.log('vertexShader : ', vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);

    console.log('fragmentShader : ', fragmentShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        },
        uniformLocations: {
            mWorldUniformLocation: gl.getUniformLocation(shaderProgram, 'mWorld'),
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const tetra = new Tetrahedron(0, 0, 0, 1, Math.sqrt(6) / 3);
    const positions = tetra.getPositions();

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const angle = Math.PI / 200;
    let tetraRotation = 0;
    const render = () => {
        const fieldOfView = Math.PI / 4;
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 100;
        const projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

        const modelViewMatrix = mat4.create();
        const identityMatrix = mat4.create();
        const viewMatrix = mat4.create();

        mat4.lookAt(viewMatrix, [0, 0, -2], [0, 0, 0], [0, 1, 0]);

        mat4.rotate(modelViewMatrix, identityMatrix, tetraRotation, [-1, -1, -1]);

        const normalize = false;
        const stride = 6 * Float32Array.BYTES_PER_ELEMENT;
        const numComponents = 3;
        const type = gl.FLOAT;
        let offset = 0;

        gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

        gl.useProgram(programInfo.program);

        gl.uniformMatrix4fv(programInfo.uniformLocations.mWorldUniformLocation, normalize, modelViewMatrix);
        gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, normalize, viewMatrix);
        gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, normalize, projectionMatrix);

        gl.drawArrays(gl.LINES, 0, positions.length / 6);

        tetraRotation += angle;
        requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);
}