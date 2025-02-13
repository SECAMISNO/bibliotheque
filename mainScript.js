// Fonction qui convertit une chaîne en camelCase en retirant les caractères spéciaux et espaces
function toCamelCase(str) {
    return str
        .replace(/[^a-zA-Z0-9 ]/g, '') // supprime tout sauf lettres, chiffres et espaces
        .split(' ')
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('table');
    const thead = table.querySelector('thead');
    thead.innerHTML = ''; // On efface tout contenu existant

    // On part du principe que ArcDatabase n'est pas vide
    const headers = Object.keys(ArcDatabase[0]);
    // On crée un tableau d'objets avec le libellé affiché et la clé normalisée (camelCase)
    const columns = headers.map(header => ({
        display: header,
        key: toCamelCase(header)
    }));

    // Création de la première ligne d'en-tête (affichage des libellés)
    const headerRow = document.createElement('tr');
    columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col.display;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Création de la deuxième ligne pour les filtres
    const filterRow = document.createElement('tr');
    columns.forEach(col => {
        const th = document.createElement('th');
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Filtrer';
        // L'ID est constitué de "filter" + la clé avec la première lettre en majuscule
        input.id = 'filter' + col.key.charAt(0).toUpperCase() + col.key.slice(1);
        th.appendChild(input);
        filterRow.appendChild(th);
    });
    thead.appendChild(filterRow);

    // Remplissage du corps du tableau avec les données
    loadarcs(columns);

    // Ajout des écouteurs sur les champs de filtre
    columns.forEach(col => {
        const filterInput = document.getElementById('filter' + col.key.charAt(0).toUpperCase() + col.key.slice(1));
        filterInput.addEventListener('input', () => applyFilters(columns));
    });

    // Applique les filtres dès le chargement (optionnel)
    applyFilters(columns);
});

function loadarcs(columns) {
    const arcTableBody = document.getElementById('arcTableBody');
    arcTableBody.innerHTML = ''; // Efface d'éventuelles anciennes lignes

    ArcDatabase.forEach(arc => {
        const row = document.createElement('tr');

        columns.forEach(col => {
            const td = document.createElement('td');
            td.textContent = arc[col.display] || '';
            row.appendChild(td);
            // On stocke dans l'attribut dataset la version en minuscules pour faciliter le filtrage
            row.dataset[col.key] = (arc[col.display] || '').toLowerCase();
        });

        arcTableBody.appendChild(row);
    });
}

function applyFilters(columns) {
    // Récupération des valeurs de filtre pour chaque colonne
    const filters = {};
    columns.forEach(col => {
        const filterInput = document.getElementById('filter' + col.key.charAt(0).toUpperCase() + col.key.slice(1));
        filters[col.key] = filterInput.value.toLowerCase();
    });

    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        let rowVisible = true;
        columns.forEach(col => {
            if (filters[col.key] && row.dataset[col.key].indexOf(filters[col.key]) === -1) {
                rowVisible = false;
            }
        });
        row.style.display = rowVisible ? '' : 'none';
    });
}