document.addEventListener("DOMContentLoaded", setTimeout.bind(this, () => document.body.classList.remove("hidden"), 50));

document.querySelectorAll("h2").forEach(el => el.addEventListener("click", () => {
    window.location.hash = el.id;
    goToSection();
})
);

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