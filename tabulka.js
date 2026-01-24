const tableBody = document.querySelector('#data-table tbody');
let selectedRow = null;

// 1. Pevné pojmy (vždy budou vidět po načtení)
const vychoziData = [
    ["Kandidátní klíč", "Databáze", "Atribut nebo kombinace atributů v tabulce, které mohou jednoznačně identifikovat každý záznam v této tabulce, potenciální primární klíče, z nichž jeden je vybrán jako primární klíč, nesmí osahovat hodnotu null", "Unikátní identifikátor řádku"],
    ["Povinný vztah entit", "Databáze", "Instance entity je propojená, např. třída musí mít třídního učitele", "Vztah, který musí existovat"],
    ["Nepovinný vztah entit", "Databáze", "Instance entity nemusí být propojená, např. registrovaný zákazník - objednávka, nemusí mít objednávku když je registrovaný", "Volitelné propojení dat"],
    ["Vztah entit", "Databáze", "To co spojuje entity, povinný/nepovinný, v diagramech kosočtverec", "Logická vazba mezi tabulkami"],
    ["Mac adresa", "Operační systémy", "Fyzická adresa zařízení, unikátní, 6 bytů, první 3 od výrobce, další 3 už opravdu unikátní, používá se jako identifikátor v lokální síti", "Fyzická adresa síťového hardwaru"],
    ["Topologie počítačových sítí", "Počítačové sítě", "Určuje, jak jsou jednotlivá zařízení v síti uspořádána a vzájemně propojena", "Architektura zapojení sítě"],
    ["Asimetrický člověk", "Různé", "Takový člověk je asi metr vysoký a asi metr široký", "Nesouměrnost proporcí"]
];

// --- LOGIKA UKLÁDÁNÍ ---
// Vykreslí data do řádku
const fillRow = (row, data) => {
    row.innerHTML = data.map(text => `<td>${text || ''}</td>`).join('');
};

// Uloží aktuální stav tabulky do LocalStorage
const saveToStorage = () => {
    const rows = [...tableBody.querySelectorAll('tr')];
    const data = rows.map(row => [...row.cells].map(td => td.innerText));
    localStorage.setItem('mojeData', JSON.stringify(data));
};

// Načte data (buď z paměti, nebo z výchozího seznamu)
const loadFromStorage = () => {
    const saved = localStorage.getItem('mojeData');

    // Pokud v paměti nic není (první spuštění u lektora), použije vychoziData
    const data = saved ? JSON.parse(saved) : vychoziData;

    data.forEach(rowData => {
        const newRow = tableBody.insertRow();
        fillRow(newRow, rowData);
    });

    // Pokud jsme načetli výchozí data, rovnou je uložíme, aby s nimi šlo pracovat
    if (!saved) saveToStorage();
};

// --- LOGIKA OVLÁDÁNÍ ---

// Načtení dat při startu
loadFromStorage();

// Výběr řádku kliknutím
tableBody.onclick = (e) => {
    const target = e.target.closest('tr');
    if (!target) return;

    if (selectedRow) selectedRow.classList.remove('selected');

    if (selectedRow === target) {
        selectedRow = null;
    } else {
        selectedRow = target;
        selectedRow.classList.add('selected');
    }
};

// Tlačítko Přidat
document.getElementById('btn-add').onclick = () => {
    const fields = ["Pojem", "Kategorii", "Vysvětlení", "Poznámku"];
    const data = fields.map(p => prompt(`Zadejte ${p}:`));

    // Kontrola, jestli uživatel nezmáčkl Storno u prvního pole
    if (data[0] !== null) {
        fillRow(tableBody.insertRow(), data);
        saveToStorage();
    }
};

// Tlačítko Upravit
document.getElementById('btn-edit').onclick = () => {
    if (!selectedRow) return alert("Nejdříve kliknutím vyberte řádek v tabulce!");

    const oldData = [...selectedRow.cells].map(td => td.innerText);
    const fields = ["Pojem", "Kategorii", "Vysvětlení", "Poznámku"];

    const newData = fields.map((p, i) => prompt(`Upravit ${p}:`, oldData[i]));

    if (newData[0] !== null) {
        fillRow(selectedRow, newData);
        saveToStorage();
    }
};

// Tlačítko Odebrat
document.getElementById('btn-remove').onclick = () => {
    if (!selectedRow) return alert("Nejdříve kliknutím vyberte řádek!");

    if (confirm("Opravdu chcete tento pojem smazat?")) {
        selectedRow.remove();
        selectedRow = null;
        saveToStorage();
    }
};