

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
    },

    add : function( p ){this.x += p.x; this.y += p.y; return this;},
    sub : function( p ){this.x -= p.x; this.y -= p.y; return this;},
    clone : function(){return new Point( this.x, this.y );},
    nearEquals : function( p, dist ){var x = Math.abs( this.x - p.x );var y = Math.abs( this.y - p.y );return (x <= dist) && (y <= dist);},
    length : function(){return Math.sqrt( this.x * this.x + this.y * this.y );},
    normalize : function ( scale ){scale = scale || 1;var l = this.length();this.x /= l;this.x *= scale;this.y /= l;this.y *= scale;return this;},
    negate : function(){this.x *= -1;this.y *= -1;return this;},
    randomize : function( amount ){this.x += ( Math.random() - .5 ) * amount;this.y += ( Math.random() - .5 ) * amount;return this;},
    toString : function(){ return "x: " + this.x +" y: "+this.y; }
};

Point.add = function( a, b ){return new Point( a.x + b.x, a.y + b.y );};
Point.sub = function( a, b ){return new Point( a.x - b.x, a.y - b.y );};
Point.fromAngleDistance = function( angle, distance ){
    return new Point( Math.cos( angle ) * distance, Math.sin( angle ) * distance );
}

