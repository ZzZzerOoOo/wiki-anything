const BASE_URL = "http://13.232.61.18:8080"; 

export async function getPageBySlug(slug) {
  const res = await fetch(`${BASE_URL}/pages/${slug}`);
  if (!res.ok) {
    throw new Error("Page not found");
  }
  return res.json();
}