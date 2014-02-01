///<reference path='Cubism.ts' />

var Shapes = {
    a: [{ x: 0, y: 0, z: 0 }, { x: 3, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 1 }, { x: 1, y: 0, z: 1 }, { x: 2, y: 0, z: 1 }, { x: 3, y: 0, z: 1 }, { x: 3, y: 1, z: 1 }],
    b: [{ x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 3, y: 1, z: 0 }, { x: 0, y: 1, z: 1 }, { x: 1, y: 1, z: 1 }, { x: 2, y: 1, z: 1 }, { x: 3, y: 1, z: 1 }],
    c: [{ x: 1, y: 0, z: 0 }, { x: 2, y: 0, z: 0 }, { x: 3, y: 0, z: 0 }, { x: 3, y: 1, z: 0 }, { x: 0, y: 2, z: 0 }, { x: 3, y: 2, z: 0 }, { x: 0, y: 3, z: 0 }, { x: 1, y: 3, z: 0 }, { x: 2, y: 3, z: 0 }, { x: 3, y: 3, z: 0 }, { x: 2, y: 0, z: 1 }, { x: 3, y: 0, z: 1 }, { x: 0, y: 2, z: 1 }, { x: 3, y: 3, z: 1 }],
    d: [{ x: 1, y: 0, z: 0 }, { x: 2, y: 0, z: 0 }, { x: 3, y: 0, z: 0 }, { x: 2, y: 1, z: 0 }, { x: 1, y: 2, z: 0 }, { x: 2, y: 2, z: 0 }, { x: 0, y: 3, z: 0 }, { x: 1, y: 3, z: 0 }, { x: 2, y: 3, z: 0 }, { x: 3, y: 3, z: 0 }, { x: 1, y: 0, z: 1 }, { x: 2, y: 0, z: 1 }],
    e: [{ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 3, y: 1, z: 0 }, { x: 0, y: 2, z: 0 }, { x: 3, y: 2, z: 0 }, { x: 0, y: 3, z: 0 }, { x: 1, y: 3, z: 0 }, { x: 2, y: 3, z: 0 }, { x: 3, y: 3, z: 0 }, { x: 0, y: 0, z: 1 }, { x: 1, y: 3, z: 1 }],
    f: [{ x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: 2, z: 0 }, { x: 2, y: 2, z: 0 }, { x: 0, y: 3, z: 0 }, { x: 1, y: 3, z: 0 }, { x: 2, y: 3, z: 0 }, { x: 3, y: 3, z: 0 }, { x: 1, y: 2, z: 1 }, { x: 1, y: 3, z: 1 }, { x: 3, y: 3, z: 1 }]
};

var voxelSize = 50;

function createShape(name) {
    var stage = $('#main')[0];
    var shape = window[name] = new Cubism.Shape(stage, voxelSize, Shapes[name]);
    $(shape.element).attr('id', name);

    return shape;
}

function init() {
    var stage = $('#main')[0];
    Cubism.CreateStage(stage, 1000);

    var a = createShape('a');
    a.element.translateY(-4 * voxelSize).translateX(-5 * voxelSize);

    var cube = Cubism.Shape.Cube(stage, voxelSize, 4);
    cube.element.translateY(-4 * voxelSize).translateX(-5 * voxelSize);

    var b = createShape('b');
    b.element.translateX(-4 * voxelSize);
}
;
