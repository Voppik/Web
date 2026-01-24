console.log('Happy developing ✨')
// --- 1. ČÁST: Bezpečné přidání odkazů ---
// Tato funkce přidá odkaz jen tehdy, pokud tlačítko na stránce skutečně existuje
function pridatOdkaz(idTlacitka, cilovaAdresa) {
    const tlacitko = document.getElementById(idTlacitka);
    if (tlacitko) {
        tlacitko.addEventListener("click", function() {
            window.location.href = cilovaAdresa;
        });
    }
}

// Definice odkazů - pokud některé tlačítko na stránce chybí, tento kód to ignoruje a jede dál
pridatOdkaz("btn-uvod", "index.html");
pridatOdkaz("btn-tvorba", "tvorba.html");
pridatOdkaz("btn-ukoly", "ukoly.html");
pridatOdkaz("btn-tabulka", "tabulka.html");
pridatOdkaz("btn-projekty", "projekty.html");


// --- 2. ČÁST: Zvýraznění aktivního tlačítka ---
function highlightActiveButton() {
    const currentPath = window.location.pathname;

    // Najdeme všechna tlačítka v sidebaru
    const buttons = document.querySelectorAll('.sidebar button');

    buttons.forEach(button => {
        // Pro jistotu nejdřív zrušíme aktivní třídu u všech
        button.classList.remove("active");

        // Podmínky pro zvýraznění
        // Používáme "includes", aby to fungovalo i když je adresa složitější
        if (currentPath.includes("index") && button.id === "btn-uvod") {
            button.classList.add("active");
        }
        else if (currentPath.includes("tvorba") && button.id === "btn-tvorba") {
            button.classList.add("active");
        }
        else if (currentPath.includes("auto1") && button.id === "btn-car") {
            button.classList.add("active");
        }
        else if (currentPath.includes("tabulka") && button.id === "btn-tabulka") {
            button.classList.add("active");
        }
    });
}

// Spustíme funkci hned po načtení
highlightActiveButton();