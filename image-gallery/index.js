const ACCESS_KEY = 'MCp4ZAg7CuJ-NrZzl7FE8cAb06D5VZ2D5h1vchf7A4o';
const RANDOM_URL = 'https://api.unsplash.com/photos/random';
const SEARCH_URL = 'https://api.unsplash.com/search/photos';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const count = 15;

document.addEventListener('DOMContentLoaded', () => {
	searchInput.focus();
	loadRandomImages();
});

searchInput.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		e.preventDefault();
		performSearch(searchInput.value);
	}
});

searchButton.addEventListener('click', function (e) {
	e.preventDefault();
	performSearch(searchInput.value);
});

async function loadRandomImages() {
	try {
		const response = await fetch(`${RANDOM_URL}?client_id=${ACCESS_KEY}&count=${count}&timestamp=${Date.now()}`);
		const data = await response.json();
		displayImages(data);
	} catch (error) {
		console.error('Ошибка при загрузке случайных изображений:', error);
	}
}

async function performSearch(query) {
	if (!query) return;

	try {
		const response = await fetch(`${SEARCH_URL}?query=${query}&client_id=${ACCESS_KEY}&per_page=${count}`);
		const data = await response.json();
		displayImages(data.results);
	} catch (error) {
		console.error('Ошибка при выполнении запроса к API:', error);
	}
}

function displayImages(images) {
	const imgContainer = document.getElementById('image-container');
	imgContainer.innerHTML = '';

	if (images.length === 0) {
		imgContainer.innerHTML = '<p>Изображения не найдены.</p>';
		return;
	}

	images.forEach((image) => {
		const imgLink = document.createElement('a');
		const imgElement = document.createElement('img');

		imgLink.classList.add('card');
		imgLink.setAttribute('target', '_blank');
		imgLink.href = image.urls.full;

		imgElement.classList.add('card__img');
		imgElement.src = image.urls.small;
		imgElement.alt = image.alt_description || 'Изображение';

		imgLink.appendChild(imgElement);
		imgContainer.appendChild(imgLink);
	});
}

function clearInput() {
	searchInput.value = '';
	searchInput.placeholder = 'Введите запрос...';
}
