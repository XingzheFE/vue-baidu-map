import _log from "utils/log";

export default function (position) {
    let styleObj = {};
    if (position &&
        position.x !== undefined &&
        position.y !== undefined &&
        !isNaN( position.x ) &&
        !isNaN( position.y )
    ) {
        if (position.x >= 0 && (position.x).toString().indexOf("-") <= -1 ) {
            styleObj.left = position.x + "px";
        } else {
            styleObj.right = Math.abs( position.x ) + "px";
        }
        if (position.y >= 0 && (position.y).toString().indexOf("-") <= -1 ) {
            styleObj.top = position.y + "px";
        } else {
            styleObj.bottom = Math.abs( position.y ) + "px";
        }
    } else {
        _log(new Error("controller position error or not existing"));
    }
    return styleObj;
}
