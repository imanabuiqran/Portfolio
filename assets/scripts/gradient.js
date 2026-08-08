const about = document.getElementById("about");
const work = document.getElementById("work");
const contact = document.getElementById("contact");
const banner = document.getElementById("banner");

window.addEventListener("scroll", () => {
    let scroll = window.scrollY;
    let height = document.body.scrollHeight - window.innerHeight;
    let progress = scroll / height;

    if (progress < 0.25) {
        about.style.backgroundColor = "white";
        work.style.backgroundColor = "white";
        contact.style.backgroundColor = "white";
        banner.style.backgroundColor = "white";
    } 
    else if (progress < 0.5) {
        about.style.backgroundColor = "white";
        work.style.backgroundColor = "white";
        contact.style.backgroundColor = "white";
        banner.style.backgroundColor = "white";        
    }
    else if (progress < 0.75) {
        about.style.backgroundColor = "white";
        work.style.backgroundColor = "white";
        contact.style.backgroundColor = "white";
        banner.style.backgroundColor = "white";
    } 
    else {
        about.style.backgroundColor = "#e9decd";
        work.style.backgroundColor = "#e9decd";
        contact.style.backgroundColor = "#e9decd";
        banner.style.backgroundColor = "#e9decd";
    }
});