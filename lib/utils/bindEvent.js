export default function ( eventList ) {
    eventList.map( ( item, index ) => {
        this.$overlay.addEventListener( item, ( e ) => {
            this.$emit( "b-" + item, e, this );
        });
    });
}
