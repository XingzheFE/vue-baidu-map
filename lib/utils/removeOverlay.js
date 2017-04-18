export function removeOverlay( map, key ) {
    map.removeOverlay( this[key] );
    for ( let i in this[key] ) {
        if ( this[key].hasOwnProperty( i ) && this[key][i] ) {
            this[key][i] = null;
        }
    }
    this[key] = null;
}
