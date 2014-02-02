var Cubism;
(function (Cubism) {
    var Point = (function () {
        function Point(x_or_pos, y, z) {
            if (typeof x_or_pos == 'number') {
                this.x = x_or_pos;
                this.y = y;
                this.z = z;
            } else {
                this.x = x_or_pos.x;
                this.y = x_or_pos.y;
                this.z = x_or_pos.z;
            }
        }
        Point.prototype.rotateZ = function () {
            return new Point(this.y, -this.x, this.z);
        };

        Point.prototype.rotateX = function () {
            return new Point(this.x, this.z, -this.y);
        };

        Point.prototype.rotateY = function () {
            return new Point(-this.z, this.y, this.x);
        };
        return Point;
    })();
    Cubism.Point = Point;
})(Cubism || (Cubism = {}));
//# sourceMappingURL=Cubism.Point.js.map
