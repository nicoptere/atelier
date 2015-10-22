/**
 * Created by nico on 22/10/2015.
 */
var metrics = function(exports)
{
    /*******************
     *
     * stats
     *
     *******************/

    exports.mean = function( values )
    {
        var mean = 0;
        values.forEach( function( e, i, a )
        {
            mean += e.value;
        } );
        mean /= values.length;
        return mean;
    };

    exports.variance = function( values )
    {
        var result = 0;

        var mean_value = this.mean( values );
        var count = values.length;

        values.forEach( function( e, i, a )
        {
            result += Math.pow( ( e.value - mean_value ), 2 );
        } );
        return result / count;
    }

    return exports;

}({});