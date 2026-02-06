const BASE_URL = "http://localhost:8080";

export async function getPageBySlug(slug) {
  const res = await fetch(`${BASE_URL}/pages/${slug}`);
  if (!res.ok) {
    throw new Error("Page not found");
  }
  return res.json();
}