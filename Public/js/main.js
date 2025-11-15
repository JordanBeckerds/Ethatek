// printResume
function printCV() {
  // Ouvre le PDF dans une nouvelle fenêtre puis lance l'impression
  const pdfWindow = window.open("assets/cvEthan.pdf", "_blank");

  if (pdfWindow) {
    pdfWindow.focus();
    // Petit délai pour laisser le PDF charger dans le navigateur
    setTimeout(() => {
      pdfWindow.print();
    }, 1000);
  } else {
    alert("Autorise les pop-ups pour imprimer le CV correctement !");
  }
}

//
document.addEventListener("DOMContentLoaded", function () {
  console.log("main.js chargé");

  // Fonction sécurisée : ne plante jamais même si l'élément n'existe pas
  function matchBoxWidth() {
    const box = document.querySelector(".box");
    const heroText = document.querySelector(".hero-text");

    if (box && heroText) {
      const width = heroText.getBoundingClientRect().width;
      box.style.width = width + "px";
    }
  }

  // Exécute seulement si les éléments existent
  if (document.querySelector(".hero-text")) {
    matchBoxWidth();
    window.addEventListener("resize", matchBoxWidth);
  }

  // Scroll smooth pour les ancres (fonctionne partout)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// Veille
// The Hacker News
new RSSWidget({
  container: "#thn-feed",
  feedUrl: "https://feeds.feedburner.com/TheHackersNews",
  theme: "dark",
  maxItems: 6,
  showDesc: true,
  showImage: true,
  imageSize: 80,
});

// Krebs on Security
new RSSWidget({
  container: "#krebs-feed",
  feedUrl: "https://krebsonsecurity.com/feed/",
  theme: "dark",
  maxItems: 6,
  showDesc: true,
  showImage: true,
  imageSize: 80,
});

//
function loadPage(page) {
  const pages = {
    home: "includes/home.html",
    veille: "includes/veille.html",
    resume: "includes/resume.html",
    competence: "includes/competence.html",
    "internship-1": "includes/internship-1.html",
    "internship-2": "includes/internship-2.html",
    projects: "includes/projects.html",
    "projects-1": "includes/projects-1.html",
    "projects-2": "includes/projects-2.html",
    "projects-3": "includes/projects-3.html",
    "projects-4": "includes/projects-4.html",
  };
  const file = pages[page] || pages.home;
  if (window.loadHTML) window.loadHTML("main-content", file);
  else
    fetch(file)
      .then((r) => r.text())
      .then((h) => (document.getElementById("main-content").innerHTML = h));
  history.pushState({ page }, "", `?page=${page}${location.hash}`);
}
window.addEventListener(
  "popstate",
  (e) => e.state?.page && loadPage(e.state.page)
);
