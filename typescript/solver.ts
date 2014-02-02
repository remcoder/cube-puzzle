///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='Cubism.ts' />
///<reference path='Cubism.PointSet.ts' />

module Solver {


var Shapes = {
    shape_a : [{x:0,y:0,z:0},{x:3,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:0,z:1},{x:2,y:0,z:1},{x:3,y:0,z:1},{x:3,y:1,z:1}],
    shape_b : [{x:0,y:0,z:0},{x:0,y:1,z:0},{x:3,y:1,z:0},{x:0,y:1,z:1},{x:1,y:1,z:1},{x:2,y:1,z:1},{x:3,y:1,z:1}],
    shape_c : [{x:1,y:0,z:0},{x:2,y:0,z:0},{x:3,y:0,z:0},{x:3,y:1,z:0},{x:0,y:2,z:0},{x:3,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:2,y:0,z:1},{x:3,y:0,z:1},{x:0,y:2,z:1},{x:3,y:3,z:1}],
    shape_d : [{x:1,y:0,z:0},{x:2,y:0,z:0},{x:3,y:0,z:0},{x:2,y:1,z:0},{x:1,y:2,z:0},{x:2,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:1,y:0,z:1},{x:2,y:0,z:1}],
    shape_e : [{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:3,y:1,z:0},{x:0,y:2,z:0},{x:3,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:0,y:0,z:1},{x:1,y:3,z:1}],
    shape_f : [{x:0,y:0,z:0},{x:0,y:1,z:0},{x:0,y:2,z:0},{x:2,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:1,y:2,z:1},{x:1,y:3,z:1},{x:3,y:3,z:1}] 
}

var voxelSize = 50; // pixel size of 1 voxel

function drawShape(className, pointSet : Cubism.PointSet) {
  var variants = <HTMLTableElement> $('#variants')[0];
  var row = <HTMLTableRowElement> variants.insertRow(0);
  var cell = row.insertCell();
  var $container = $('<div>')
      .css({
          width: 200,
          height: 200
      })
      .addClass('voxel-shape-container');

  $(cell).append($container);

  var shape = new Cubism.Shape($container[0], voxelSize, pointSet.points);
  $(shape.element).addClass(className);

  return shape;
}

function rotationalVariants(s : Cubism.PointSet) {
  var rotations =
   ["",
    "Y",
    "YY",
    "YYY",
    "Z",
    "ZX",
    "ZXX",
    "ZXXX",
    "ZZ",
    "ZZY",
    "ZZYY",
    "ZZYYY",
    "ZZZ",
    "ZZZX",
    "ZZZXX",
    "ZZZXXX",
    "X",
    "XZ",
    "XZZ",
    "XZZZ",
    "XXX",
    "XXXZ",
    "XXXZZ",
    "XXXZZZ"].slice(0,5);

    var variants = [];
    for(var r=0 ; r<rotations.length ; r++)
    {
      var rot = rotations[r];
      var variant = s.clone();


      for (var i=0 ; i<rot.length ; i++)
      {
        var step = rot[i];
        switch (step) {
          case "X":
            variant = variant.rotateAllX();
            break;
          case "Y":
            variant = variant.rotateAllY();
            break;
          case "Z":
            variant = variant.rotateAllZ();
            break;
          }
      }
      variant = variant.normalize();
      variants.push(variant);
    }

    return variants;
}

export function solve() {
  
  var stage = $('#main')[0];

  
  //var a = createShape('shape_a');
  var shape_a : Array<Cubism.IPos> = Shapes.shape_a;
  var a = new Cubism.PointSet(shape_a);
  console.log(JSON.stringify(a));

//  var a1 = drawShape('shape_a', a);

  var variants = rotationalVariants(a);
  console.log(JSON.stringify);


  variants.forEach(v => drawShape('shape_a', v));


  // // rotate around Z
  // var a2 = a.clone().rotateZ();
  // var a3 = a.clone().rotateZ(2);
  // var a4 = a.clone().rotateZ(3);
  
  // a2.element.translateY(-4*voxelSize).translateX(-7*voxelSize);
  // a3.element.translateY(-4*voxelSize).translateX(0*voxelSize);
  // a4.element.translateY(-4*voxelSize).translateX(7*voxelSize);
  
  // // rotate around X
  // var a5 = a.clone().rotateX();
  // var a6 = a.clone().rotateX(2);
  // var a7 = a.clone().rotateX(3);
  // a5.element.translateY(voxelSize).translateX(-7*voxelSize);
  // a6.element.translateY(voxelSize).translateX(0*voxelSize);
  // a7.element.translateY(voxelSize).translateX(7*voxelSize);

  
  // // rotate around Y 
  // var a8 = a.clone().rotateY();
  // var a9 = a.clone().rotateY(2);
  // var a10 = a.clone().rotateY(3);
  // a8.element.translateY(4*voxelSize).translateX(-7*voxelSize);
  // a9.element.translateY(4*voxelSize).translateX(0*voxelSize);
  // a10.element.translateY(4*voxelSize).translateX(7*voxelSize);

  // var cube = Cubism.Shape.Cube(stage, voxelSize, 4); 
  // cube.element.translateY(-4*voxelSize).translateX(-5*voxelSize);

  // var b = createShape('shape_b');
  // b.element.translateX(-4*voxelSize);

  
}

}