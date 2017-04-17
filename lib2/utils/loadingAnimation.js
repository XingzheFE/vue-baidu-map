class Loading {
    constructor ( str ) {
        this.status = false;
        this.el = {};
        let box = {};
        if ( typeof str === "string" ) {
            box = document.querySelector( str );
        } else {
            box = str;
        }
        let element = document.createElement("div");
        element.setAttribute( "class", "loading-animation-1-0-1");
        element.innerHTML = "<div class=\"circle\"></div><h3>&nbsp;&nbsp;Loading...</h3>";
        this.el = element;
        if ( box ) {
            box.appendChild( this.el );
        } else {
            console.warn( "Loading Animation can not find element" )
            document.body.appendChild( this.el );
        }
    }
    show ( time ) {
        this.status = true;
        setTimeout( () => {
            if ( this.el ) {
                this.el.style.display = "block";
                this.el.style.opacity = "1";
            }
        }, time || 0);
    }
    hide ( time ) {
        this.status = false;
        setTimeout( () => {
            if ( this.el ) {
                this.el.style.opacity = "0";
                setTimeout( () => {
                    this.el.style.display = "none";
                }, 400);
            }
        }, time || 0);
    }
}

export default Loading;
