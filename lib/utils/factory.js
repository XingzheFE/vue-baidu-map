export function createIcon ( config ) {

}

export function createLabel ( config ) {
    return new BMap.Label( config.text, { offset: createSize( config.offset ) } );
}

export function createPoint ( point ) {
    return new BMap.Point( point.lng, point.lat );
}

export function createSize( config ) {
    return new BMap.Size( config.x, config.y );
}
