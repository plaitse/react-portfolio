// To set various color
// Add precision mediump float;
// Add varying vec3 color;

export default `
    precision mediump float;
    varying vec3 color;

    void main(void) {
        gl_FragColor = vec4(color, 1.0);
    }
`;
