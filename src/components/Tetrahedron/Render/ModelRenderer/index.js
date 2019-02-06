import GLC from '../../Commander';
import Shader from '../../Shaders/ModelShader';

export default class ModelRenderer {
    constructor() {
        this.shader = new Shader();
        this.models = {};
    }

    registerNewModel = (model, id) => {
        if (this.models[id]) {
            this.models[id] = {
                type: model,
                instances: [],
            }
        }
    }

    addInstance = (instance, id) => {
        console.log('@@@@@@@@@@@@@@ :', instance);
        console.log('@@@@@@@@@@@@@@ :', this.models[id].instances);
        this.models[id].instances.push(instance);
        console.log('@@@@@@@@@@@@@@ :', this.models[id].instances);
    }

    preRender = () => {
        GLC.viewport();
        GLC.depthTest(true);
    }

    render = () => {
        this.preRender();
        this.shader.use();
        Object.keys(this.models).forEach(model => {
            this.models[model].type.use(this.shader);
            this.models[model].instances.forEach(instance => {
                GLC.drawTriangles(this.models[model].type.indices.length);
            }) 
        })
    }
}