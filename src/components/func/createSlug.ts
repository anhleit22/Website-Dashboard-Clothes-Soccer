import unidecode from 'unidecode-plus';

function createSlug(inputString: string) {
  let slug = unidecode(inputString)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return slug;
}

export { createSlug };
