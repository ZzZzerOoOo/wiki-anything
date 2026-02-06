import React, { useState } from "react";
function Block({ block, pageId, onDelete, onEdit, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(block.content);
    const [type, setType] = useState(block.type);
    
    function handleSave() {
    const newBlock = {...block, content, type};
    onEdit(pageId, newBlock);
    setIsEditing(false);
  }
    if (isEditing) {
      
    return (
      <div className="block">
        
          <select value={type} onChange={e => setType(e.target.value)}>
        <option value="TEXT">TEXT</option>
        <option value="CODE">CODE</option>
      </select>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={block.type === "CODE" ? 6 : 3}
        />

        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    );
  }
  return (
    <div className="block">
      {block.type === "TEXT" && <p>{block.content}</p>}
      {block.type === "CODE" && (
        <pre>
          <code>{block.content}</code>
        </pre>
      )}
       <button onClick={() => {onUpdate(pageId,block,"Up");}}>
        ↑
      </button>
       <button onClick={() => {onUpdate(pageId,block,"Down");}}>
        ↓
      </button>
       <button onClick={() => {setIsEditing(true);}}>
        Edit
      </button>
      <button onClick={() => onDelete(pageId,block.orderIndex)}>
        Delete
      </button>
    </div>
  );
  }

export default Block;
