import GLC from '../Commander';
import ModelRenderer from '../Render/ModelRenderer';
import ModelType from '../Models/ModelType';
import ModelInstance from '../Models/ModelInstance';
import Tetrahedron from './tetrahedron';

export default (id) => {
    const canvas = document.querySelector(`#${id}`);
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    GLC.init(gl);

    // To create a cube, import it and replace it down below
    const vertices = Tetrahedron.vertices;

    const indices = Tetrahedron.indices;

    const modelRender = new ModelRenderer();
    modelRender.registerNewModel(new ModelType(vertices, indices), 'triangle');
    const instance = new ModelInstance(0, 0, 0, 0, 0, 0, 0.5);
    modelRender.addInstance(instance, 'triangle');

    const render = () => {
        GLC.clear(1.0, 1.0, 1.0, 1.0);
        instance.updateRotation(1, 1, 1);
        modelRender.render();
        window.requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);
}