import { useState } from "react";
import { addBlock } from "../api/blocks";

function AddBlockForm({ pageId, onBlockAdded }) {
  const [type, setType] = useState("TEXT");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const newBlock = await addBlock(pageId, {
        type,
        content,
      });
      onBlockAdded(newBlock);
      setContent("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="add-block-form" onSubmit={handleSubmit}>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="TEXT">TEXT</option>
        <option value="CODE">CODE</option>
      </select>

      <br />

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={type === "CODE" ? 6 : 3}
      />

      <br />

      <button disabled={loading || !content}>
        Add Block
      </button>
    </form>
  );
}

export default AddBlockForm;
