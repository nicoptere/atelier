

//une classe point qui stocke 2 coorodnnées X et Y
var Point = function( x, y ){
    this.x = x || 0;
    this.y = y || 0;
};

//deux méthodes utiles pour travailler avec des points
Point.prototype =
{

    angle : function( other )
    {
        var dx = other.x - this.x;
        var dy = other.y - this.y;
        return Math.atan2( dy, dx );
    },

    distance : function( other )
    {
        var dx = other.x - this.x;
        var dy = other.y - this.y;
        return Math.sqrt( dx*dx + dy*dy );
    }

};

