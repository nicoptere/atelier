var loader = function( exports ){

    var req = new XMLHttpRequest();
    req.onload = function( e )
    {
        //un tableau d'objets
        var data = [];

        //on isole chaque ligne du fichier reçu

        data = e.target.responseText.split( "\n")

            //on enlève les entrées vides

            .filter( function( str )
            {
                return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '').length != 0;
            })

            //convertit chaque entrée en tableau de valeurs

            .map( function( str )
            {
                return  str.split( ";" )
                    //caste les valeurs numériques en chiffres
                    .map( function( s )
                    {
                        var value = s;
                        if( !isNaN( parseFloat( s ) ) )return parseFloat( s );
                        return s;
                    });
            })

            //convertit chaque entrée en objet pour pouvoir accéder plus facilement aux informations

            .map( function( input, i, arr )
            {
                //on crée un objet pour stocker les infos

                var obj = {};

                //on se sert des clés de la première entrée

                var keys = arr[ 0 ];
                keys.forEach( function( key, id )
                {
                    obj[ key ] = input[ id ];
                });

                return obj;
            });


        //on supprime la première entrée (le descriptif des champs )
        data.shift();

        //appelle la méthode de rappel en lui passant le tableau d'objets
        exports.callback( data );


    };


    exports.load = function( url, callback )
    {
        exports.callback = callback;
        req.open( "GET",  url );
        req.send();

    };

    return exports;

}({});