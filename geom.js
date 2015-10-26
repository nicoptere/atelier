

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
Point.fromAngleDistance = function( angle, distance ){return new Point( Math.cos( angle ) * distance, Math.sin( angle ) * distance );}






function getPositionAt( points, t ) {

    var length = points.length-1;
    var i0 = Math.floor( length * t );
    i0 = i0 < length - 1 ? i0 : length - 1;
    var i1 = Math.min( i0 + 1, length );

    var delta = 1 / length;
    var nt =  ( t - ( i0 * delta ) ) / delta;
    return p = new Point(
        lerp( nt, points[i0].x, points[i1].x ),
        lerp( nt, points[i0].y, points[i1].y )
    );
}








var Rectangle = function()
{
    function Rectangle(x,y,w,h)
    {
        this.x = x||0;
        this.y = y||0;
        this.width = w||0;
        this.height = h||0;

        this.cx = this.cy = 0;
        this.center = new Point();
        this.getCenter();

    }

    function union( other )
    {
        this.x = Math.min( other.x, this.x );
        this.y = Math.min( other.y, this.y );
        this.width = Math.max( other.width, this.width );
        this.height = Math.max( other.height, this.height );
        return this;
    }
    function getCenter()
    {
        this.cx = this.center.x = this.x + this.w / 2;
        this.cy = this.center.y = this.y + this.h / 2;
        return this.center;
    }

    function containsPoint( x, y )
    {
        if( x < this.x     ) return false;
        if( y < this.y      ) return false;
        if( x > this.x + this.w    ) return false;
        return y <= this.y + this.h;
    }

    function isContained( x, y, w, h )
    {
        return (    this.x   >= x
        &&  this.y    >= y
        &&  this.x + this.w  <= x+w
        &&  this.y + this.h <= y+h );
    }

    function intersect( x, y, w, h )
    {
        return !(  x > this.x + this.w || x+w < this.x || y > this.y + this.h || y+h< this.y );
    }

    function intersection( b )
    {

        var a = this;

        var x = Math.max(a.x, b.x);
        var num1 = Math.min(a.x + a.w, b.x + b.w);
        var y = Math.max(a.y, b.y);
        var num2 = Math.min(a.y + a.h, b.y + b.h);

        if (num1 >= x && num2 >= y){

            var dx = Math.max( a.x , b.x );
            var dy = Math.max( a.y , b.y );
            return new Rect( x, y, num1 - dx - x, num2 - dy - y);
        }
        else return null;
    }
    function equals( other )
    {
        return (  other.x == this.x && other.y == this.y && this.width == this.width && other.height == this.height );
    }

    function scale( value )
    {
        this.x += value * this.w;
        this.y += value * this.h;
        this.w -= value * this.w * 2;
        this.h -= value * this.h * 2;
    }
    function clone(){return new Rectangle( this.x, this.y, this.width, this.height ); }

    var _p = Rectangle.prototype;
    _p.constructor = Rectangle;
    _p.union = union;
    _p.getCenter = getCenter;
    _p.containsPoint = containsPoint;
    _p.isContained = isContained;
    _p.intersect = intersect;
    _p.intersection = intersection;
    _p.equals = equals;
    _p.scale = scale;
    _p.clone = clone;
    return Rectangle;
}();