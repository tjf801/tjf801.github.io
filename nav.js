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
            /href=\"\/?([0-9\-\.\?=a-zA-Z][0-9\/\-\.\?=a-zA-Z]*)\"/g,
            "href=\""+ '../'.repeat(layers) + (layers?'':'/') + "$1\""
        );
        // console.log(newelem.innerHTML);
        if (oldelem.parentNode) {
            oldelem.parentNode.replaceChild(newelem, oldelem);
        }
    }
});

fetch('/splashes.txt')
.then(res => res.text())
.then(file => {
    const lines = file.split(/\n/);
    
    // lol this is such a dumb way to do this why does JS not have a random.seed
    const hash = function(string) {
        let result = 0;
        if (string.length === 0) return result;
        for (let i = 0; i < string.length; ++i) {
            result = ((result << 5) - result) + string.charCodeAt(i);
            result |= 0; // keep result as an integer ._.
        }
        return result;
    };
    
    // Math.random() * lines.length
    const salt = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const idx = Math.abs(hash(file + salt.toString())) % lines.length;
    const choice = lines[idx];
    
    const splash = document.getElementById("splash-text");
    if (!splash) return;
    
    splash.innerHTML = choice;
})
