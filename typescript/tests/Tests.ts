///<reference path='../Cubism.Shape.ts' />

module Tests {
    export function run() {
        console.info('running tests');


        var pSet = new Cubism.PointSet([{x:0,y:0,z:0},{x:3,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1},{x:1,y:0,z:1},{x:2,y:0,z:1},{x:3,y:0,z:1},{x:3,y:1,z:1}]);

        var bounds = pSet.getBounds();
        if (bounds.min.x < 0)
            throw new Error('bounds.min.x should be > 0');
        if (bounds.min.y < 0)
            throw new Error('bounds.min.y should be > 0');
        if (bounds.min.z < 0)
            throw new Error('bounds.min.z should be > 0');

        console.info('[test 2] a normalized pointset should always start at (0,0,0)');


        var pSet2 = pSet.normalize();
        var bounds2 = pSet2.getBounds();
        if (bounds2.min.x != 0)
            throw new Error('bounds.min.x should be 0');
        if (bounds2.min.y != 0)
            throw new Error('bounds.min.y should be 0');
        if (bounds2.min.z != 0)
            throw new Error('bounds.min.z should be 0');

        var dims= 'XYZ';
        for(var d = 0 ; d<dims.length ; d++)
        {
            var dim = dims[d];
            var pSet3 = pSet.clone();
            for(var times = 0 ; times<3 ; times++)
            {
                //console.debug( dim + times );
                if (dim == 'X')
                    pSet3 = pSet3.rotateAllX();
                else if (dim == 'Y')
                    pSet3 = pSet3.rotateAllY();
                else if (dim == 'Z')
                    pSet3 = pSet3.rotateAllZ();
            }
            pSet3 = pSet3.normalize();
            var bounds3 = pSet3.getBounds();
            if (bounds3.min.x != 0)
                throw new Error('bounds.min.x should be 0');
            if (bounds3.min.y != 0)
                throw new Error('bounds.min.y should be 0');
            if (bounds3.min.z != 0)
                throw new Error('bounds.min.z should be 0');
        }

        console.info('done running tests');
    }
}