///<reference path='../Cubism.Shape.ts' />
///<reference path='../solver.ts' />

module Tests {
    export function run() {
        console.info('running tests');


        var pSet = new Cubism.PointSet(Solver.Pieces['shape_a']);

        // bounds

        var bounds = pSet.getBounds();
        if (bounds.min.x < 0)
            throw new Error('bounds.min.x should be > 0');
        if (bounds.min.y < 0)
            throw new Error('bounds.min.y should be > 0');
        if (bounds.min.z < 0)
            throw new Error('bounds.min.z should be > 0');

        console.info('[test 2] a normalized pointset should always start at (0,0,0)');

        // normalize

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

        // equals
        Object.keys(Solver.Pieces).forEach(p=> {
            var piece = Solver.Pieces[p];
            var pSet1 = new Cubism.PointSet(piece);
            var pSet2 = new Cubism.PointSet(shuffle(piece));
            if (! pSet1.equals(pSet2))
                throw new Error('pointset should equal itself');
        });

        console.info('done running tests');

        var pSet4 = new Cubism.PointSet([{x:0,y:0,z:0}, {x:1,y:0,z:0}]);
        var pSet5 = new Cubism.PointSet([{x:1,y:0,z:0}, {x:0,y:0,z:0}]);
        if (! pSet4.equals(pSet5))
            throw new Error('pointset equality shouldn\'t depend on order');

        var pSet4 = new Cubism.PointSet([{x:0,y:0,z:0}, {x:0,y:1,z:0}]);
        var pSet5 = new Cubism.PointSet([{x:0,y:1,z:0}, {x:0,y:0,z:0}]);
        if (! pSet4.equals(pSet5))
            throw new Error('pointset equality shouldn\'t depend on order');

        var pSet4 = new Cubism.PointSet([{x:0,y:0,z:0}, {x:0,y:0,z:1}]);
        var pSet5 = new Cubism.PointSet([{x:0,y:0,z:1}, {x:0,y:0,z:0}]);
        if (! pSet4.equals(pSet5))
            throw new Error('pointset equality shouldn\'t depend on order');

//        var count = 0;
//        Object.keys(Solver.Pieces).forEach(p=> {
//            var piece = Solver.Pieces[p];
//            var variants = Solver.rotationalVariants(new Cubism.PointSet(piece));
//
//            variants.forEach(v1 =>{
//                variants.forEach(v2 =>{
//
//                    if (v1.variant != v2.variant) {
//                        console.debug( count + '| testing ' + p + ': ' + (v1.variant || 'Id') + ' vs ' + (v2.variant || 'Id'));
//                        if (v1.pointSet.equals(v2.pointSet)) {
//                            console.debug(JSON.stringify(v1.pointSet));
//                            console.debug(JSON.stringify(v2.pointSet));
//                            throw new Error('variant ' + v1.variant + ' enexpectedly equals ' + v2.variant);
//                        }
//
//                        count++;
//                    }
//                });
//            });
//        });


    }
}