///<reference path='Cubism.Point.ts' />
var Cubism;
(function (Cubism) {
    var PointSet = (function () {
        function PointSet(points) {
            this.points = points.map(function (p) {
                return new Cubism.Point(p);
            });
        }
        PointSet.prototype.rotateAllX = function () {
            return new PointSet(this.points.map(function (p) {
                return p.rotateX();
            }));
        };

        PointSet.prototype.rotateAllY = function () {
            return new PointSet(this.points.map(function (p) {
                return p.rotateY();
            }));
        };

        PointSet.prototype.rotateAllZ = function () {
            return new PointSet(this.points.map(function (p) {
                return p.rotateY();
            }));
        };
        return PointSet;
    })();
    Cubism.PointSet = PointSet;
})(Cubism || (Cubism = {}));
//# sourceMappingURL=Cubism.PointSet.js.map
