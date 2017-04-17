export default function _log ( info ) {
    if ( typeof info === 'string' ) {
        console.log( `[vue-baidu-map] ${ info }` );
    } else if ( info instanceof Error ) {
        console.error( `[vue-baidu-map] ${ info.message }` )
    }
}
