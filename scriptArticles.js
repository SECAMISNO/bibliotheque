const bookTableBody = document.getElementById('bookTableBody');

function loadBooks() {
    bookDatabase.forEach((book) => {
        const row = document.createElement('tr');

        for (const property in book) {
            if (book.hasOwnProperty(property)) {
                // Vérifiez si la valeur est une chaîne de caractères avant d'appeler toLowerCase()
                const propertyValue = (typeof book[property] === 'string') ? book[property].toLowerCase() : book[property];
                row.dataset[property] = propertyValue;
            }
        }
        
	row.innerHTML = `
		<td>${book.Auteurs}</td>
		<td>${book.Themes}</td>
		<td>${book.Titres}</td>
		<td>${book.Annee}</td>
		<td>${book.Page}</td>
		<td>${book.Numero}</td>
		<td>${book.MotsCles}</td>
	`;

        bookTableBody.appendChild(row);
    });
}

// Récupérez les éléments d'entrée de filtrage
const filterAuteurs = document.getElementById('filterAuteurs');
const filterThemes = document.getElementById('filterThemes');
const filterTitres = document.getElementById('filterTitres');
const filterAnnee = document.getElementById('filterAnnee');
const filterPage = document.getElementById('filterPage');
const filterNumero = document.getElementById('filterNumero');
const filterMotsCles = document.getElementById('filterMotsCles');

// Écoutez les événements d'entrée pour le filtrage
filterAuteurs.addEventListener('input', applyFilters);
filterThemes.addEventListener('input', applyFilters);
filterTitres.addEventListener('input', applyFilters);
filterAnnee.addEventListener('input', applyFilters);
filterPage.addEventListener('input', applyFilters);
filterNumero.addEventListener('input', applyFilters);
filterMotsCles.addEventListener('input', applyFilters);

// Fonction pour appliquer les filtres
function applyFilters() {
	const filters = {
		Auteurs: filterAuteurs.value.toLowerCase(),
		Themes: filterThemes.value.toLowerCase(),
		Titres: filterTitres.value.toLowerCase(),
		Annee: filterAnnee.value.toLowerCase(),
		Page: filterPage.value.toLowerCase(),
		Numero: filterNumero.value.toLowerCase(),
		MotsCles: filterMotsCles.value.toLowerCase(),
	};

    const rows = document.querySelectorAll('table tbody tr');
    
    rows.forEach((row) => {
        let rowVisible = true;
        for (let key in filters) {
            if (filters[key] && row.dataset[key].toLowerCase().indexOf(filters[key]) === -1) {
                rowVisible = false;
                break;
            }
        }
        row.style.display = rowVisible ? '' : 'none';
    });
}
	
// Appliquez les filtres lors du chargement de la page
applyFilters();