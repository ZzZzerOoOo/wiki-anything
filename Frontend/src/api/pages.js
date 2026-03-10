const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createPage(wikiId,title) {

  const res = await fetch(`${BASE_URL}/pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title: title,
      wikiId: 1
  }),
  });

  if (!res.ok) {
    throw new Error("Failed to create page");
  }

  return res.json();
}

export async function getPageBySlug(wikiId,slug) {
  const res = await fetch(`${BASE_URL}/pages/${wikiId}/${slug}`);
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

export async function deletePage(wikiId,slug) {
  const res = await fetch(`${BASE_URL}/pages/${wikiId}/${slug}`, {
    method: "DELETE",
  });
}