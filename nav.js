// shamelessly stolen from https://stackoverflow.com/a/68909928
// (but then modified to work with typescript)
fetch('nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    if (oldelem) {
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        if (oldelem.parentNode) {
            oldelem.parentNode.replaceChild(newelem, oldelem);
        }
    }
})