import Locations from './locations';

// To set various color
// Add precision mediump float;
// Add varying vec3 color;
// Add color = ${Locations.POSITION};

// To set a matrix
// Add uniform mat4 transformationMatrix;
// Then multiply vec4 with * uniform mat4 transformationMatrix; inside gl_Position

export default `
    attribute vec3 ${Locations.POSITION};

    uniform mat4 mWorld;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * mWorld * vec4(${Locations.POSITION}, 1.0);
    }
`;
