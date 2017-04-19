export function createIcon ( conf ) {
    let iconOption = {};
    if ( !conf )
        return;
    if ( conf.imageSize )
        iconOption.imageSize = createSize( conf.imageSize );
    if ( conf.size && conf.imageSize )
        iconOption.imageOffset = createSize( {
            x: ( conf.size.x - conf.imageSize.x ) / 2,
            y: ( conf.size.y - conf.imageSize.y ) / 2
        });
    if ( conf.anchor )
        iconOption.anchor = createSize( conf.anchor );
    return new BMap.Icon( conf.img, createSize( conf.size ), iconOption );
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

export function checkIconConfig ( conf ) {
    if (conf && (
            (conf.img && conf.imageSize && conf.imageSize instanceof Object && !isNaN( conf.imageSize.x ) && !isNaN( conf.imageSize.y  ) && conf.size && conf.size instanceof Object && !isNaN( conf.size.x ) && !isNaN( conf.size.y )
            ) || conf.anchor && conf.anchor instanceof Object && !isNaN( conf.anchor.x ) && !isNaN( conf.anchor.y )
        )
    ) {
        return true;
    }
    return false;
}
