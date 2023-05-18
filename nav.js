fetch('/nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    if (oldelem) {
        // THIS IS AWFUL. TO WHOEVER IS ACTUALLY LOOKING AT THIS, I AM SORRY.
        // IN MY DEFENSE, AT THE MOMENT, I LITERALLY DONT KNOW **SHIT** ABOUT HOW JS WORKS.
        const layers = window.location.pathname.split("/").length - 2;
        let newelem = document.createElement("div");
        newelem.innerHTML = text.replaceAll(
            /href=\"\/?([0-9\-\.a-zA-Z][0-9\/\-\.a-zA-Z]*)\"/g,
            "href=\""+ '../'.repeat(layers) + (layers?'':'/') + "$1\""
        );
        console.log(newelem.innerHTML);
        if (oldelem.parentNode) {
            oldelem.parentNode.replaceChild(newelem, oldelem);
        }
    }
})
