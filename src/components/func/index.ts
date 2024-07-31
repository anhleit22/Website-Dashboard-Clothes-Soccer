
function createSlug(inputString:string) {
  let slug = inputString.toLowerCase().replace(/[^\w\s-]/g, '');
  slug = slug.replace(/[\s_]+/g, '-');
  slug = slug.replace(/^-+|-+$/g, '');
  return slug;
}

export {createSlug};
