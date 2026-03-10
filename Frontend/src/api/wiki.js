const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createWiki(wiki) {
  const res = await fetch(`${BASE_URL}/wiki`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wiki),
  });

  if (!res.ok) {
    throw new Error("Failed to create wiki");
  }

  return res.json();
}

export async function getWikiBySlug(slug) {
  const res = await fetch(`${BASE_URL}/wiki/${slug}`);
  if (!res.ok) {
    throw new Error("wiki not found");
  }
  return res.json();
}

export async function getWiki() {
  const res = await fetch(`${BASE_URL}/wiki/`);
  if (!res.ok) {
    throw new Error("Failed to fetch wiki");
  }
  return res.json();
}

export async function deleteWiki(slug) {
  const res = await fetch(`${BASE_URL}/wiki/${slug}`, {
    method: "DELETE",
  });
}