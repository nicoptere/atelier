
//méthode de création d'un contexte graphique
function getContext(w,h) {

    var canvas = document.createElement( "canvas" );
    canvas.width = w;
    canvas.height = h;
    return canvas.getContext( "2d" );
}

//mise étend le contexte sur toute la surface de la fenêtre
function onResize(){

    w = window.innerWidth;
    h = window.innerHeight;
    ctx.canvas.width = w;
    ctx.canvas.height = h;
}
window.addEventListener( "resize", onResize, false );


//creation du context
var w = window.innerWidth;
var h = window.innerHeight;

var ctx = getContext( w, h );
var canvas = ctx.canvas;
document.body.appendChild( canvas );




//méthodes utiles
function lerp ( t, a, b ){ return a + t * ( b - a ); }
function norm( t, a, b ){return ( t - a ) / ( b - a );}
function map( t, a0, b0, a1, b1 ){ return lerp( norm( t, a0, b0 ), a1, b1 );}

//constantes
var PI = Math.PI;
var PI2 = PI * 2;
var RAD = PI / 180;

//polyfill pour le requestAnimationFrame (mieux qu'un setInterval):
//https://github.com/cagosta/requestAnimationFrame/blob/master/app/requestAnimationFrame.js
(function(global) {(function() {if (global.requestAnimationFrame) {return;} if (global.webkitRequestAnimationFrame) {global.requestAnimationFrame = global[ 'webkitRequestAnimationFrame' ]; global.cancelAnimationFrame = global[ 'webkitCancelAnimationFrame' ] || global[ 'webkitCancelRequestAnimationFrame' ];} var lastTime = 0; global.requestAnimationFrame = function(callback) {var currTime = new Date().getTime(); var timeToCall = Math.max(0, 16 - (currTime - lastTime)); var id = global.setTimeout(function() {callback(currTime + timeToCall);}, timeToCall); lastTime = currTime + timeToCall; return id;}; global.cancelAnimationFrame = function(id) {clearTimeout(id);};})(); if (typeof define === 'function') {define(function() {return global.requestAnimationFrame;});}})(window);
