///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='Cubism.Shape.ts' />
///<reference path='Cubism.PointSet.ts' />

module Solver {

    var grid = {};

    var Shapes = {
//        shape_a : [{x:0,y:0,z:0},{x:3,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:0,z:1},{x:2,y:0,z:1},{x:3,y:0,z:1},{x:3,y:1,z:1}],
//        shape_b : [{x:0,y:0,z:0},{x:0,y:1,z:0},{x:3,y:1,z:0},{x:0,y:1,z:1},{x:1,y:1,z:1},{x:2,y:1,z:1},{x:3,y:1,z:1}],
        shape_c : [{x:1,y:0,z:0},{x:2,y:0,z:0},{x:3,y:0,z:0},{x:3,y:1,z:0},{x:0,y:2,z:0},{x:3,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:2,y:0,z:1},{x:3,y:0,z:1},{x:0,y:2,z:1},{x:3,y:3,z:1}]
//        shape_d : [{x:1,y:0,z:0},{x:2,y:0,z:0},{x:3,y:0,z:0},{x:2,y:1,z:0},{x:1,y:2,z:0},{x:2,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:1,y:0,z:1},{x:2,y:0,z:1}],
//        shape_e : [{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:3,y:1,z:0},{x:0,y:2,z:0},{x:3,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:0,y:0,z:1},{x:1,y:3,z:1}],
//        shape_f : [{x:0,y:0,z:0},{x:0,y:1,z:0},{x:0,y:2,z:0},{x:2,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:1,y:2,z:1},{x:1,y:3,z:1},{x:3,y:3,z:1}]
    }

    var voxelSize = 50; // pixel size of 1 voxel

    function drawShape(pieceType, pointSet : Cubism.PointSet, variant: string) {
      var variants = <HTMLTableElement> $('#variants')[0];
      var row = <HTMLTableRowElement> variants.insertRow(0);
      var cell = row.insertCell();

      var bounds = pointSet.getBounds();
      var maxEdgeLength = 1 + Math.max( Math.max(bounds.max.x, bounds.max.y), bounds.max.z);
      console.debug('maxEdgeLength', maxEdgeLength);
      var containerSize = maxEdgeLength * voxelSize * 1.5;
      var $container = $('<div>')
          .css({
              width: containerSize,
              height: containerSize
          })
          .addClass('voxel-shape-container');

      $(cell).append($container);

      var shape = new Cubism.Shape($container[0], voxelSize, pointSet.points);
      $(shape.element)
          .addClass(pieceType)
          .addClass(variant)
          .attr('title', variant);

      return shape;
    }

    function drawShape2(className, pointSet : Cubism.PointSet, variant: string) {
        var $container = $('<div>')
            .css({
                width: 200,
                height: 200
            })
            .addClass('voxel-shape-container');

        $('body').append($container);

        var shape = new Cubism.Shape($container[0], voxelSize, pointSet.points);
        $(shape.element).addClass(className);

        return shape;
    }

    function rotationalVariants(s : Cubism.PointSet) : Array<{ variant: string; pointSet: Cubism.PointSet }> {
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
        "XXXZZZ"].slice(0,2);

        var variants = [];
        for(var r=0 ; r<rotations.length ; r++)
        {
          var rot = rotations[r];
          var variant = s.clone();
            console.debug(rot);

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
          variants.push({ variant: rot, pointSet: variant });
        }

        return variants;
    }

    export function solve() {


      Object.keys(Shapes).forEach(key => {
          var piece = Shapes[key];
          var pointSet = new Cubism.PointSet(<Array<Cubism.IPos>>piece);
          var variants = rotationalVariants(pointSet);
          variants.forEach(v => drawShape(key, v.pointSet, v.variant));
      })


    }

}