const BASE_URL = 'https://pixabay.com/api/';
const PAGE = 1;
const PER_PAGE = 12;
const KEY = '22247215-1c12035fc4e9317ec5669aed6';

function fetchImage(name) {
  return fetch(
    `${BASE_URL}?q=${name}&key=${KEY}&image_type=photo&orientation=horizontal&page=${PAGE}&per_page=${PER_PAGE}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`❗ Not found ${name}`));
  });
}

export default { fetchImage };
