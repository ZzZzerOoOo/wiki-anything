const BASE_URL = "http://13.232.61.18:8080"; 

export async function createPage(page) {
  const res = await fetch(`${BASE_URL}/pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(page),
  });

  if (!res.ok) {
    throw new Error("Failed to create page");
  }

  return res.json();
}

export async function getPageBySlug(slug) {
  const res = await fetch(`${BASE_URL}/pages/${slug}`);
  if (!res.ok) {
    throw new Error("Page not found");
  }
  return res.json();
}

export async function getPages() {
  const res = await fetch(`${BASE_URL}/pages/`);
  if (!res.ok) {
    throw new Error("Failed to fetch pages");
  }
  return res.json();
}

export async function deletePage(slug) {
  const res = await fetch(`${BASE_URL}/pages/${slug}`, {
    method: "DELETE",
  });
}