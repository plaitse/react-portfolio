import GLC from '../../Commander';
import VertexSource from './vertex';
import FragmentSource from './fragment';
import Locations from './locations';

// Shader
// A shader is an OpenGL program that runs in the GPU that we're going to upload
// 2 types: vertex shader and fragment shader
// The vertex shader takes in the positional data and outputs that to the fragment shader
// Then the fragment shader can do some color crackle calculation and render the scene

export default class ModelShader {
    constructor() {
        const vertexShader = GLC.createVertexShader();
        GLC.addShaderSource(vertexShader, VertexSource);
        GLC.compileShader(vertexShader);

        const fragmentShader = GLC.createFragmentShader();
        GLC.addShaderSource(fragmentShader, FragmentSource);
        GLC.compileShader(fragmentShader);

        const program = GLC.createShaderProgram();
        GLC.attachShaderToProgram(program, vertexShader);
        GLC.attachShaderToProgram(program, fragmentShader);
        GLC.linkProgram(program);

        this.positionAttribute = GLC.getAttribLocation(program, Locations.POSITION);
        this.transformationMatrix = GLC.getUniformLocation(program, 'transformationMatrix');
        this.program = program;
    }

    use = () => {
        GLC.useProgram(this.program);
    }

    enablePosition = () => {
        console.log('this.positionAttr : ', this.positionAttribute);
        GLC.enableVertexAttribArray(this.positionAttribute);
        GLC.pointToAttribute(this.positionAttribute, 3);
    }

    enableTransformationMatrix = (matrix) => {
        console.log(matrix);
        GLC.uploadMatrix4fv(this.transformationMatrix, matrix);
    }
}