/*
 * MIT license
 * remcoder [at] gmail (dot) com
 
 This is a little library for making shapes (polycubes) out of multiple cubes using CSS 3D Transforms
 */

///<reference path='CSSStyleDeclaration.d.ts' />
///<reference path='Element.Transform3d.ts' />
///<reference path='Cubism.Point.ts' />
 
module Cubism {
  
  enum Side { front, back, left, right, top, bottom };


  export function CreateStage(el : HTMLElement, perspective : number) {
    el.style.webkitPerspective = perspective + "px";
    el.style.webkitTransformStyle = "preserve-3d";
  }

  export class Shape {

    /**
      * @param scale The scale at which a single voxel is drawn
      */
    static Cube(containerElement : HTMLElement, voxelSize : number, edgeLength: number) : Shape {
      var voxels = [];

      for(var x=0 ; x<edgeLength ; x++)
      for(var y=0 ; y<edgeLength ; y++)
      for(var z=0 ; z<edgeLength ; z++)
        voxels.push({x:x, y:y, z:z});

      return new Shape(containerElement, voxelSize, voxels);
    }

    width   : number
    height  : number
    depth   : number
    element : HTMLElement
    voxels  : Array<Voxel> = []

    constructor (public container : HTMLElement, public voxelSize : number, coordList: Array<IPos>) {
      // TODO: calc the size of the shape in 3 dimensions
      this.width = voxelSize;
      this.height = voxelSize;
      this.depth = voxelSize;
      
      this.element = $('<div>')
        .addClass("voxel-shape")
        .css({
          width : this.width,
          height : this.height
        })
        .appendTo(this.container)[0];
      
      coordList.forEach((pos) => {
        this.voxels.push(new Voxel(this, pos, this.voxelSize));
      });
      
      // if (autocenter)
      //   this.element.translate3d(-this.width/2, -this.height/2, -this.depth/2);
    }

    clone () : Shape {
      var coordsList = this.voxels.map((v) => {
        return {
          x: v.pos.x,
          y: v.pos.y,
          z: v.pos.z
        };
      });

      var newShape = new Shape(this.container, this.voxelSize, coordsList);
      $(newShape.element).attr("class", $(this.element).attr("class"));
      return newShape;
    }

    // rotate around the Z axis, in steps of 90 degrees 
    rotateZ(steps : number = 1) {
      this.voxels.forEach((v) => {
        v.rotateZ(steps);
        v.updatePosition();
      })
      return this;
    }

    // rotate around the X axis, in steps of 90 degrees 
    rotateX(steps : number = 1) {
      this.voxels.forEach((v) => {
        v.rotateX(steps);
        v.updatePosition();
      })
      return this;
    }

    // rotate around the X axis, in steps of 90 degrees 
    rotateY(steps : number = 1) {
      this.voxels.forEach((v) => {
        v.rotateY(steps);
        v.updatePosition();
      })
      return this;
    }
  }

  // a Voxel is a set of coords and a DOM tree
  export class Voxel {
    element : HTMLElement
    constructor (public shape : Shape, public pos : IPos, public voxelSize : number ) { 
      //var center =  this.autocenter ? -(0.5*this.zvoxelSize-0.5*this.voxelSize) : 0;

      this.createVoxelElement();
      this.updatePosition();
          
    }

    createVoxelElement() {
    
      this.element = $('<div>')
        .addClass("voxel")
        .appendTo(this.shape.element)[0];
      
      [Side.front, Side.back, Side.left, Side.right, Side.top, Side.bottom]
        .forEach((which) => this._createSide(which));
      
      // if (autocenter)
      //   element.translate3d(-size/2, -size/2, -size/2);
    }

    private _createSide(which: Side) {
      var side = $('<div>')
        .addClass("voxel-side")
        .addClass(Side[which])
        .appendTo(this.element)[0];
      
      var offset = this.voxelSize/2;
      switch(which)
      {
        case Side.front:
          side.translateZ(offset);
          break;
        case Side.back:
          side.translateZ(-offset);
          break;
        case Side.left:
          side.translateX(-offset).rotateY(90);
          break;
        case Side.right:
          side.translateX(offset).rotateY(-90);
          break;
        case Side.top:
          side.translateY(offset).rotateX(90);
          break;
        case Side.bottom:
          side.translateY(-offset).rotateX(90);
          break;
        default:
          side.rotateY(90);    
      }
      
      return side;
    }

    updatePosition() {
      this.element.setTranslate3d(this.pos.x*this.voxelSize, this.pos.y*this.voxelSize, this.pos.z*this.voxelSize);
          //.translateZ(center);
    }

    // rotate around the Z axis, in steps of 90 degrees,
    rotateZ(steps : number = 1) {
      for(var i=0 ; i<steps ; i++) {
        var prevX = this.pos.x;
        this.pos.x = this.pos.y;
        this.pos.y = -prevX;
      }
    }

    // rotate around the X axis, in steps of 90 degrees,
    rotateX(steps : number = 1) {
      for(var i=0 ; i<steps ; i++) {
        var prevY = this.pos.y;
        this.pos.y = this.pos.z;
        this.pos.z = -prevY;
      }
    }

    // rotate around the Y axis, in steps of 90 degrees,
    rotateY(steps : number = 1) {
      for(var i=0 ; i<steps ; i++) {
        var prevZ = this.pos.z;
        this.pos.z = this.pos.x;
        this.pos.x = -prevZ;
      }
    }
  }
}
