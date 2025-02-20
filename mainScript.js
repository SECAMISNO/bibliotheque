// Fonction qui convertit une chaîne en camelCase en retirant les caractères spéciaux et espaces
function toCamelCase(str) {
    return str
        .replace(/[^a-zA-Z0-9 ]/g, '')
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
    thead.innerHTML = '';

    // Récupération des en-têtes issus de ArcDatabase
    const headers = Object.keys(ArcDatabase[0]);
    let columns = [];
    
    if (typeof PATH_IMAGE !== 'undefined') {
        // 1ère colonne : le premier champ de ArcDatabase
        columns.push({ display: headers[0], key: toCamelCase(headers[0]), filterable: true });
        // 2ème colonne : la colonne miniature
        columns.push({ display: '', key: 'thumbnail', filterable: false });
        // Colonnes restantes : les autres champs
        for (let i = 1; i < headers.length; i++) {
            columns.push({ display: headers[i], key: toCamelCase(headers[i]), filterable: true });
        }
    } else {
        headers.forEach(header => {
            columns.push({ display: header, key: toCamelCase(header), filterable: true });
        });
    }

    // Création de la première ligne d'en-tête
    const headerRow = document.createElement('tr');
    columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col.display;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Création de la deuxième ligne pour les filtres (seulement sur les colonnes filtrables)
    const filterRow = document.createElement('tr');
    columns.forEach(col => {
        const th = document.createElement('th');
        if (col.filterable) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Filtrer';
            input.id = 'filter' + col.key.charAt(0).toUpperCase() + col.key.slice(1);
            th.appendChild(input);
        }
        filterRow.appendChild(th);
    });
    thead.appendChild(filterRow);

    // Remplissage du corps du tableau avec les données
    loadarcs(columns);

    // Ajout des écouteurs sur les champs de filtre
    columns.forEach(col => {
        if (col.filterable) {
            const filterInput = document.getElementById('filter' + col.key.charAt(0).toUpperCase() + col.key.slice(1));
            filterInput.addEventListener('input', () => applyFilters(columns));
        }
    });

    // Applique les filtres dès le chargement (optionnel)
    applyFilters(columns);
});

function loadarcs(columns) {
    const arcTableBody = document.getElementById('arcTableBody');
    arcTableBody.innerHTML = '';

    // Le premier champ de l'ArcDatabase (utilisé pour générer le nom de l'image)
    const originalHeaders = Object.keys(ArcDatabase[0]);
    const firstKey = originalHeaders[0];

    ArcDatabase.forEach(arc => {
        const row = document.createElement('tr');

        columns.forEach(col => {
            const td = document.createElement('td');
            if (col.key === 'thumbnail') {
                // Construction de l'URL de l'image : PATH_IMAGE + [valeur du premier champ] + '.jpg'
                let imageSrc = PATH_IMAGE + arc[firstKey] + '.jpg';
                const img = document.createElement('img');
                img.src = imageSrc;
                // Si l'image n'est pas trouvée, on laisse la cellule vide
                img.onerror = function() {
                    td.innerHTML = '';
                };
                td.appendChild(img);
            } else {
                td.textContent = arc[col.display] || '';
                // Stockage dans dataset pour faciliter le filtrage
                row.dataset[col.key] = (arc[col.display] || '').toLowerCase();
            }
            row.appendChild(td);
        });
        arcTableBody.appendChild(row);
    });
}

function applyFilters(columns) {
    const filters = {};
    // Ne prendre en compte que les colonnes filtrables
    columns.forEach(col => {
        if (col.filterable) {
            const filterInput = document.getElementById('filter' + col.key.charAt(0).toUpperCase() + col.key.slice(1));
            filters[col.key] = filterInput.value.toLowerCase();
        }
    });

    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        let rowVisible = true;
        columns.forEach(col => {
            if (col.filterable && filters[col.key] && row.dataset[col.key].indexOf(filters[col.key]) === -1) {
                rowVisible = false;
            }
        });
        row.style.display = rowVisible ? '' : 'none';
    });
}