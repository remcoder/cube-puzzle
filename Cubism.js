/*
* MIT license
* remcoder [at] gmail (dot) com
This is a little library for making shapes (polycubes) out of multiple cubes using CSS 3D Transforms
*/
///<reference path='CSSStyleDeclaration.d.ts' />
///<reference path='Element.Transform3d.ts' />
var Cubism;
(function (Cubism) {
    var Side;
    (function (Side) {
        Side[Side["front"] = 0] = "front";
        Side[Side["back"] = 1] = "back";
        Side[Side["left"] = 2] = "left";
        Side[Side["right"] = 3] = "right";
        Side[Side["top"] = 4] = "top";
        Side[Side["bottom"] = 5] = "bottom";
    })(Side || (Side = {}));
    ;

    function CreateStage(el, perspective) {
        el.style.webkitPerspective = perspective + "px";
        el.style.webkitTransformStyle = "preserve-3d";
    }
    Cubism.CreateStage = CreateStage;

    var Shape = (function () {
        function Shape(container, voxelSize, coordList) {
            var _this = this;
            this.container = container;
            this.voxelSize = voxelSize;
            this.voxels = [];
            // TODO: calc the size of the shape in 3 dimensions
            this.width = voxelSize;
            this.height = voxelSize;
            this.depth = voxelSize;

            this.element = $('<div>').addClass("voxel-shape").css({
                width: this.width,
                height: this.height
            }).appendTo(this.container)[0];

            coordList.forEach(function (pos) {
                _this.voxels.push(new Voxel(_this, pos, _this.voxelSize));
            });
            // if (autocenter)
            //   this.element.translate3d(-this.width/2, -this.height/2, -this.depth/2);
        }
        /**
        * @param scale The scale at which a single voxel is drawn
        */
        Shape.Cube = function (containerElement, voxelSize, edgeLength) {
            var voxels = [];

            for (var x = 0; x < edgeLength; x++)
                for (var y = 0; y < edgeLength; y++)
                    for (var z = 0; z < edgeLength; z++)
                        voxels.push({ x: x, y: y, z: z });

            return new Shape(containerElement, voxelSize, voxels);
        };

        Shape.prototype.clone = function () {
            var coordsList = this.voxels.map(function (v) {
                return {
                    x: v.pos.x,
                    y: v.pos.y,
                    z: v.pos.z
                };
            });

            var newShape = new Shape(this.container, this.voxelSize, coordsList);
            $(newShape.element).attr("class", $(this.element).attr("class"));
            return newShape;
        };

        // rotate around the Z axis, in steps of 90 degrees
        Shape.prototype.rotateZ = function (steps) {
            if (typeof steps === "undefined") { steps = 1; }
            this.voxels.forEach(function (v) {
                v.rotateZ(steps);
                v.updatePosition();
            });
            return this;
        };

        // rotate around the X axis, in steps of 90 degrees
        Shape.prototype.rotateX = function (steps) {
            if (typeof steps === "undefined") { steps = 1; }
            this.voxels.forEach(function (v) {
                v.rotateX(steps);
                v.updatePosition();
            });
            return this;
        };

        // rotate around the X axis, in steps of 90 degrees
        Shape.prototype.rotateY = function (steps) {
            if (typeof steps === "undefined") { steps = 1; }
            this.voxels.forEach(function (v) {
                v.rotateY(steps);
                v.updatePosition();
            });
            return this;
        };
        return Shape;
    })();
    Cubism.Shape = Shape;

    // a Voxel is a set of coords and a DOM tree
    var Voxel = (function () {
        function Voxel(shape, pos, voxelSize) {
            this.shape = shape;
            this.pos = pos;
            this.voxelSize = voxelSize;
            //var center =  this.autocenter ? -(0.5*this.zvoxelSize-0.5*this.voxelSize) : 0;
            this.createVoxelElement();
            this.updatePosition();
        }
        Voxel.prototype.createVoxelElement = function () {
            var _this = this;
            this.element = $('<div>').addClass("voxel").appendTo(this.shape.element)[0];

            [0 /* front */, 1 /* back */, 2 /* left */, 3 /* right */, 4 /* top */, 5 /* bottom */].forEach(function (which) {
                return _this._createSide(which);
            });
            // if (autocenter)
            //   element.translate3d(-size/2, -size/2, -size/2);
        };

        Voxel.prototype._createSide = function (which) {
            var side = $('<div>').addClass("voxel-side").addClass(Side[which]).appendTo(this.element)[0];

            var offset = this.voxelSize / 2;
            switch (which) {
                case 0 /* front */:
                    side.translateZ(offset);
                    break;
                case 1 /* back */:
                    side.translateZ(-offset);
                    break;
                case 2 /* left */:
                    side.translateX(-offset).rotateY(90);
                    break;
                case 3 /* right */:
                    side.translateX(offset).rotateY(-90);
                    break;
                case 4 /* top */:
                    side.translateY(offset).rotateX(90);
                    break;
                case 5 /* bottom */:
                    side.translateY(-offset).rotateX(90);
                    break;
                default:
                    side.rotateY(90);
            }

            return side;
        };

        Voxel.prototype.updatePosition = function () {
            this.element.setTranslate3d(this.pos.x * this.voxelSize, this.pos.y * this.voxelSize, this.pos.z * this.voxelSize);
            //.translateZ(center);
        };

        // rotate around the Z axis, in steps of 90 degrees,
        Voxel.prototype.rotateZ = function (steps) {
            if (typeof steps === "undefined") { steps = 1; }
            for (var i = 0; i < steps; i++) {
                var prevX = this.pos.x;
                this.pos.x = this.pos.y;
                this.pos.y = -prevX;
            }
        };

        // rotate around the X axis, in steps of 90 degrees,
        Voxel.prototype.rotateX = function (steps) {
            if (typeof steps === "undefined") { steps = 1; }
            for (var i = 0; i < steps; i++) {
                var prevY = this.pos.y;
                this.pos.y = this.pos.z;
                this.pos.z = -prevY;
            }
        };

        // rotate around the Y axis, in steps of 90 degrees,
        Voxel.prototype.rotateY = function (steps) {
            if (typeof steps === "undefined") { steps = 1; }
            for (var i = 0; i < steps; i++) {
                var prevZ = this.pos.z;
                this.pos.z = this.pos.x;
                this.pos.x = -prevZ;
            }
        };
        return Voxel;
    })();
    Cubism.Voxel = Voxel;
})(Cubism || (Cubism = {}));
