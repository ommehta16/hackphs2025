document.addEventListener("DOMContentLoaded", setTimeout.bind(this, () => document.body.classList.remove("hidden"), 50));

document.querySelectorAll("h2").forEach(el => el.addEventListener("click", () => {
    window.location.hash = el.id;
    goToSection();
}));

function goToSection() {
    if (window.location.hash == "") return;
    console.log(window.location.hash);
    const el = document.querySelector(window.location.hash);
    if (!el) return;
    el.scrollIntoView({ block: "center" });
}

addEventListener("DOMContentLoaded", setTimeout.bind(this, goToSection, 400));
addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a").forEach(el => {
        if (el.href.includes("#")) el.addEventListener("click", setTimeout.bind(this, goToSection, 0)); // i still hate this
    });
});

const sectionBgs = new Map([ // x, y, zoom -- x, y is center
    // [null, [0, 0, 1]],
    ["bg-1", [0, 0, 4]],
    ["bg-2", [-10, -50, 4]], // x and y are -50 to 50 OR 0 to 100 OR -1 to 1 OR 0 to 1 OR -100 to 100 ?
    ["bg-3", [0, 0, 1]],
    ["bg-4", [0, 0, 1]],
    ["bg-5", [0, 0, 1]],
]);
/**
     * @todo make this specify change in terms of % of the image x/% of the image y instead of px (translate happens BEFORE zoom, so ) 
     */

const bottomBg = [0, 0, 1];

addEventListener("scroll", () => {


    const loc = window.scrollY;

    /** @type {string | null} */
    let above = null;

    /** @type {string | null} */
    let below = null;

    /** @type {HTMLElement | null} */
    let a = null;

    /** @type {HTMLElement | null} */
    let b = null;

    for (const secDesc of sectionBgs) {
        const secName = secDesc[0];
        /** @type {HTMLElement} */
        const sec = document.querySelector("." + secName);
        if (!sec) continue;

        const top = sec.getBoundingClientRect().top;
        if (top <= 0) {
            if (!a) {
                a = sec;
                above = secName;
                continue;
            }
            if (top > a.getBoundingClientRect().top) {
                a = sec;
                above = secName;
            }
        }
        else {
            if (!b) {
                b = sec;
                below = secName;
                continue;
            }
            if (top < b.getBoundingClientRect().top) {
                b = sec;
                below = secName;
            }

        }
    }
    const transform1 = above ? sectionBgs.get(above) : [0, 0, 1];
    const transform2 = below ? sectionBgs.get(below) : bottomBg;

    const top1 = a ? a.offsetTop : 0;
    const top2 = b ? b.offsetTop : document.body.scrollHeight;

    const h = top2 - top1;
    const prog = (loc - top1) / h;
    // console.log(prog);

    // now lerp between transform1 and transform2 by prog

    let transformNew = [0, 0, 0];
    // console.log(a, b);
    for (let i = 0; i < 3; i++) {
        transformNew[i] = transform2[i] * prog + transform1[i] * (1 - prog);
    }

    /**
     * @todo make this specify change in terms of % of the image x/% of the image y instead of px (translate happens BEFORE zoom, so ) 
     */
    document.documentElement.style.setProperty("--bg-x", `${transformNew[0]}%`);
    document.documentElement.style.setProperty("--bg-y", `${transformNew[1]}/50`);
    document.documentElement.style.setProperty("--bg-zoom", `${transformNew[2]}`);

    // console.log(below);
    // transform by transformNew
})