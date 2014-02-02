///<reference path='Cubism.Point.ts' />

module Cubism {
	export class PointSet {
		points : Array<Point>;

		constructor(points: Array<IPos>) {
		    this.points = points.map(p => new Point(p) );
		}

		rotateAllX(): PointSet
		{
			return new PointSet(this.points.map(p => p.rotateX() ));
		}

		rotateAllY(): PointSet
		{
			return new PointSet(this.points.map(p => p.rotateY() ));
		}

		rotateAllZ(): PointSet
		{
			return new PointSet(this.points.map(p => p.rotateY() ));
		}

        clone() : PointSet {
            return new PointSet(this.points);
        }

        // get the bounding cuboid for this pointset, defined by two opposing points: min & max.
        getBounds() : { min : IPos; max : IPos}  {
            return this.points.reduce((acc: { min : IPos; max : IPos}, p: IPos) => {
                return {
                    min : { x:Math.min(acc.min.x, p.x), y:Math.min(acc.min.y, p.y), z:Math.min(acc.min.z, p.z)},
                    max : { x:Math.max(acc.max.x, p.x), y:Math.max(acc.max.y, p.y), z:Math.max(acc.max.z, p.z)}
                }
            }, {
                min : {x: Infinity, y: Infinity, z: Infinity},
                max : {x:-Infinity, y:-Infinity, z:-Infinity}
            });
        }

        translateAll(x,y,z) : PointSet {
            return new PointSet(this.points.map(p => p.translate(x,y,z) ))
        }

        // translates the pointset such that this.getBounds().min equals (0,0,0)
        normalize() : PointSet {
            var bounds = this.getBounds();
            return this.translateAll(-bounds.min.x, -bounds.min.y, -bounds.min.z);
        }
	}
}
