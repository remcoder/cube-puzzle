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
	}
}
