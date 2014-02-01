/*
Element.Transform3d.js
MIT license
remcoder [at] gmail (dot) com
This is a convenience library for making simple CSS 3D Tranformations easily scriptable.
*/
///<reference path='utils.ts' />
///<reference path='CSSStyleDeclaration.d.ts' />

WebKitCSSMatrix.__IDENTITY__ = new WebKitCSSMatrix("matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)");

extend(Element.prototype, {
    getComputedTransform: function () {
        // returns a WebKitCSSMatrix object. for reference see:
        // http://developer.apple.com/safari/library/documentation/AppleApplications/Reference/SafariJSRef/WebKitCSSMatrix/WebKitCSSMatrix.html
        // TODO: test if it is faster w/o the try/catch and always pre-parse the transformation string
        var transform = window.getComputedStyle(this).webkitTransform;

        if (transform === "")
            throw new Error("Cannot read transform info. Element not attached to the DOM?");

        try  {
            return new WebKitCSSMatrix(transform);
        } catch (error) {
            if (transform == null)
                return null;

            // FIXME: split the numbers directly with a regexp (for speed)
            var matches = transform.match(/matrix3d\((.*)\)/);
            if (matches && matches[1]) {
                var numbers = matches[1].split(",").map(parseFloat);
                return new WebKitCSSMatrix("matrix3d(" + numbers.join(",") + ")");
            } else {
                // try a 2D matrix
                matches = transform.match(/matrix\((.*)\)/);
                if (matches && matches[1]) {
                    var numbers = matches[1].split(",").map(parseFloat);
                    return new WebKitCSSMatrix("matrix(" + numbers.join(",") + ")");
                } else {
                    throw new Error("Unable to fix this transformation string:\n" + transform + "\n\tinner exception:\n\t" + error);
                }
            }
        }
    },
    resetTransform: function () {
        this.style.webkitTransform = null;
        return this;
    },
    setTranslate3d: function (x, y, z) {
        this.style.webkitTransform = WebKitCSSMatrix.__IDENTITY__.translate(x, y, z);
        return this;
    },
    translate3d: function (x, y, z) {
        this.style.webkitTransform = this.getComputedTransform().translate(x, y, z);
        return this;
    },
    translateX: function (x) {
        this.translate3d(x, 0, 0);
        return this;
    },
    translateY: function (y) {
        this.translate3d(0, y, 0);
        return this;
    },
    translateZ: function (z) {
        this.translate3d(0, 0, z);
        return this;
    },
    setRotate3d: function (x, y, z) {
        this.style.webkitTransform = WebKitCSSMatrix.__IDENTITY__.rotate(x, y, z);
        return this;
    },
    rotate3d: function (x, y, z) {
        this.style.webkitTransform = this.getComputedTransform().rotate(x, y, z);
        return this;
    },
    rotateX: function (x) {
        this.rotate3d(x, 0, 0);
        return this;
    },
    rotateY: function (y) {
        this.rotate3d(0, y, 0);
        return this;
    },
    rotateZ: function (z) {
        this.rotate3d(0, 0, z);
        return this;
    },
    setScale3d: function (x, y, z) {
        this.style.webkitTransform = WebKitCSSMatrix.__IDENTITY__.scale(x, y, z);
        return this;
    },
    scale3d: function (x, y, z) {
        this.style.webkitTransform = this.getComputedTransform().scale(x, y, z);
        return this;
    },
    scaleX: function (x) {
        this.scale3d(x, 1, 1);
        return this;
    },
    scaleY: function (y) {
        this.scale3d(1, y, 1);
        return this;
    },
    scaleZ: function (z) {
        this.scale3d(1, 1, z);
        return this;
    }
});
