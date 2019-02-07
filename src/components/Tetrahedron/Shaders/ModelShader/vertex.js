import Locations from './locations';

// To set various color
// Add precision mediump float;
// Add varying vec3 color;
// Add color = ${Locations.POSITION};

// To set a matrix
// Add uniform mat4 transformationMatrix;
// Then multiply vec4 with * uniform mat4 transformationMatrix; inside gl_Position

export default `
    precision mediump float;
    attribute vec3 ${Locations.POSITION};
    varying vec3 color;
    uniform mat4 transformationMatrix;

    void main(void) {
        color = ${Locations.POSITION};
        gl_Position = transformationMatrix * vec4(${Locations.POSITION}, 1.0);
    }
`;
