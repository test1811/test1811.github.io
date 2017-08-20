function reengage_click() {
    var loc = location.href;
    var hash = window.location.hash.substring(1)

    if(hash){
        hash = "#" + hash;
        loc = loc.replace(hash, "");
    }

    loc += loc.indexOf("?") === -1 ? "?" : "&";

    location.href = loc + "r3engage=1" + hash;
}
