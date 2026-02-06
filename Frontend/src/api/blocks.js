const BASE_URL = "http://localhost:8080";

export async function addBlock(pageId, block) {
  const res = await fetch(`${BASE_URL}/pages/${pageId}/blocks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(block),
  });

  if (!res.ok) {
    throw new Error("Failed to add block");
  }

  return res.json();
}

export async function deleteBlock(pageId, blockId) {
  const res = await fetch(`${BASE_URL}/pages/${pageId}/blocks/${blockId}`, {
    method: "DELETE",
  });


  if (!res.ok) {
    throw new Error("Failed to delete block");
  }
  else{
    
  }


}

export async function editBlock(pageId, block) {
const res = await fetch(`${BASE_URL}/pages/${pageId}/blocks/${block.orderIndex}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(block),
});

if (!res.ok) {
  throw new Error("Failed to add block");
}

return res.json();
}


export async function updateBlock(pageId, block, direction) {
const res = await fetch(`${BASE_URL}/pages/${pageId}/blocks/${block.orderIndex}/${direction}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(block),
});

if (!res.ok) {
  throw new Error("Failed to update block");
}

return res.json();
}