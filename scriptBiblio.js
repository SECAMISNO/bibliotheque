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
		<td>${book.ID}</td>
		<td>${book.Auteurs}</td>
		<td>${book.Titre}</td>
		<td>${book.SousTitre}</td>
		<td>${book.Editeur}</td>
		<td>${book.LieuEdition}</td>
		<td>${book.DateEdition}</td>
		<td>${book.Remarques}</td>
		<td>${book.ThemeGeneral}</td>
		<td>${book.Lieu}</td>
		<td>${book.Sujet}</td>
		<td>${book.Saisie}</td>
		<td>${book.support}</td>
		<td>${book.DateAcquisition}</td>
		<td>${book.ModeAcquisition}</td>
		<td>${book.PrixAquisition}</td>
		<td>${book.FondsOuDons}</td>
	`;

        bookTableBody.appendChild(row);
    });
}

// Récupérez les éléments d'entrée de filtrage
const filterAuthors = document.getElementById('filterAuthors');
const filterTitle = document.getElementById('filterTitle');
const filterSubtitle = document.getElementById('filterSubtitle');
const filterPublisher = document.getElementById('filterPublisher');
const filterPlaceEdition = document.getElementById('filterPlaceEdition');
const filterDateEdition = document.getElementById('filterDateEdition');
const filterRemarks = document.getElementById('filterRemarks');
const filterGeneralTheme = document.getElementById('filterGeneralTheme');
const filterPlace = document.getElementById('filterPlace');
const filterSubject = document.getElementById('filterSubject');
const filterInput = document.getElementById('filterInput');
const filterSupport = document.getElementById('filterSupport');
const filterAcquisitionDate = document.getElementById('filterAcquisitionDate');
const filterAcquisitionMode = document.getElementById('filterAcquisitionMode');
const filterAcquisitionPrice = document.getElementById('filterAcquisitionPrice');
const filterFundsOrDonations = document.getElementById('filterFundsOrDonations');

// Écoutez les événements d'entrée pour le filtrage
filterAuthors.addEventListener('input', applyFilters);
filterTitle.addEventListener('input', applyFilters);
filterSubtitle.addEventListener('input', applyFilters);
filterPublisher.addEventListener('input', applyFilters);
filterPlaceEdition.addEventListener('input', applyFilters);
filterDateEdition.addEventListener('input', applyFilters);
filterRemarks.addEventListener('input', applyFilters);
filterGeneralTheme.addEventListener('input', applyFilters);
filterPlace.addEventListener('input', applyFilters);
filterSubject.addEventListener('input', applyFilters);
filterInput.addEventListener('input', applyFilters);
filterSupport.addEventListener('input', applyFilters);
filterAcquisitionDate.addEventListener('input', applyFilters);
filterAcquisitionMode.addEventListener('input', applyFilters);
filterAcquisitionPrice.addEventListener('input', applyFilters);
filterFundsOrDonations.addEventListener('input', applyFilters);

// Fonction pour appliquer les filtres
function applyFilters() {
	const filters = {
		Auteurs: filterAuthors.value.toLowerCase(),
		Titre: filterTitle.value.toLowerCase(),
		SousTitre: filterSubtitle.value.toLowerCase(),
		Editeur: filterPublisher.value.toLowerCase(),
		LieuEdition: filterPlaceEdition.value.toLowerCase(),
		DateEdition: filterDateEdition.value.toLowerCase(),
		Remarques: filterRemarks.value.toLowerCase(),
		ThemeGeneral: filterGeneralTheme.value.toLowerCase(),
		Lieu: filterPlace.value.toLowerCase(),
		Sujet: filterSubject.value.toLowerCase(),
		Saisie: filterInput.value.toLowerCase(),
		support: filterSupport.value.toLowerCase(),
		DateAcquisition: filterAcquisitionDate.value.toLowerCase(),
		ModeAcquisition: filterAcquisitionMode.value.toLowerCase(),
		PrixAquisition: filterAcquisitionPrice.value.toLowerCase(),
		FondsOuDons: filterFundsOrDonations.value.toLowerCase()
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