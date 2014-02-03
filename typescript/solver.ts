///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='Cubism.Shape.ts' />
///<reference path='Cubism.PointSet.ts' />

module Solver {



    export var Pieces : { [key : string] : Array<Cubism.IPos> } = {
        shape_a : [{x:0,y:0,z:0},{x:3,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:0,z:1},{x:2,y:0,z:1},{x:3,y:0,z:1},{x:3,y:1,z:1}],
        shape_b : [{x:0,y:0,z:0},{x:0,y:1,z:0},{x:3,y:1,z:0},{x:0,y:1,z:1},{x:1,y:1,z:1},{x:2,y:1,z:1},{x:3,y:1,z:1}],
        shape_c : [{x:1,y:0,z:0},{x:2,y:0,z:0},{x:3,y:0,z:0},{x:3,y:1,z:0},{x:0,y:2,z:0},{x:3,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:2,y:0,z:1},{x:3,y:0,z:1},{x:0,y:2,z:1},{x:3,y:3,z:1}],
        shape_d : [{x:1,y:0,z:0},{x:2,y:0,z:0},{x:3,y:0,z:0},{x:2,y:1,z:0},{x:1,y:2,z:0},{x:2,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:1,y:0,z:1},{x:2,y:0,z:1}],
        shape_e : [{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:3,y:1,z:0},{x:0,y:2,z:0},{x:3,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:0,y:0,z:1},{x:1,y:3,z:1}],
        shape_f : [{x:0,y:0,z:0},{x:0,y:1,z:0},{x:0,y:2,z:0},{x:2,y:2,z:0},{x:0,y:3,z:0},{x:1,y:3,z:0},{x:2,y:3,z:0},{x:3,y:3,z:0},{x:1,y:2,z:1},{x:1,y:3,z:1},{x:3,y:3,z:1}]
    }

    var voxelSize = 50; // pixel size of 1 voxel

    function drawShape(pieceType, pointSet : Cubism.PointSet, variant: string) {
      var variants = <HTMLTableElement> $('#variants')[0];
      var row = <HTMLTableRowElement> variants.insertRow(0);
      var cell = row.insertCell();

      var bounds = pointSet.getBounds();
      var maxEdgeLength = 1 + Math.max( Math.max(bounds.max.x, bounds.max.y), bounds.max.z);
      //console.debug('maxEdgeLength', maxEdgeLength);
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

    function drawShape3(pieceType, pointSet : Cubism.PointSet, variant: string, pos: Cubism.IPos) {

        var bounds = pointSet.getBounds();
        var maxEdgeLength = 1 + Math.max( Math.max(bounds.max.x, bounds.max.y), bounds.max.z);
        //console.debug('maxEdgeLength', maxEdgeLength);
        var containerSize = maxEdgeLength * voxelSize * 1.5;
        var $container = $('.voxel-shape-container');

        var shape = new Cubism.Shape($container[0], voxelSize, pointSet.translateAll(0,3-bounds.max.y,0).points);
        $(shape.element)
            .addClass(pieceType)
            .addClass(variant)
            .attr('title', variant);

        shape.element
            .translate3d(pos.x, pos.y , pos.z)
            .rotateAxisAngle(-1,-1, 0, 20);

        var xyPlanePointSet = Cubism.PointSet.Cuboid(4, 4, 1).translateAll(0,0,-1);
        var xyPlane = new Cubism.Shape($container[0], voxelSize, xyPlanePointSet.points);
        $(xyPlane.element)
            .addClass("plane")
            .addClass("xy-plane");

        xyPlane.element
            .translate3d(pos.x, pos.y , pos.z)
            .rotateAxisAngle(-1,-1, 0, 20);

        var yzPlanePointSet = Cubism.PointSet.Cuboid(1, 4, 4).translateAll(-1,0,0);
        var yzPlane = new Cubism.Shape($container[0], voxelSize, yzPlanePointSet.points);
        $(yzPlane.element)
            .addClass("plane")
            .addClass("yz-plane");

        yzPlane.element
            .translate3d(pos.x, pos.y , pos.z)
            .rotateAxisAngle(-1,-1, 0, 20);

        var xzPlanePointSet = Cubism.PointSet.Cuboid(4, 1, 4).translateAll(0,4,0);
        var xzPlane = new Cubism.Shape($container[0], voxelSize, xzPlanePointSet.points);
        $(xzPlane.element)
            .addClass("plane")
            .addClass("xz-plane");

        xzPlane.element
            .translate3d(pos.x, pos.y , pos.z)
            .rotateAxisAngle(-1,-1, 0, 20);

        return shape;
    }

    export function rotationalVariants(s : Cubism.PointSet) : Array<{ variant: string; pointSet: Cubism.PointSet }> {
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
        "XXXZZZ"].slice(0,1);

        var variants = [];
        for(var r=0 ; r<rotations.length ; r++)
        {
          var rot = rotations[r];
          var variant = s.clone();
//          console.debug(rot);

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

      var offset = new Cubism.Point({x:200, y:0, z:0});

      Object.keys(Pieces).forEach(key => {
          var piece = Pieces[key];
          var pointSet = new Cubism.PointSet(<Array<Cubism.IPos>>piece);
          var variants = rotationalVariants(pointSet);
          variants.forEach( v => {
              drawShape3(key, v.pointSet, v.variant, offset)
              offset = offset.translate(0,250,0);
          });

      })


    }

}