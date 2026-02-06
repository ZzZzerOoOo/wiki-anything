import { useEffect, useState } from "react";
import Block from "./../components/Block";
import { getPageBySlug } from "./../api/pages";
import AddBlockForm from "./../components/AddBlockForm";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";
import { deleteBlock,editBlock, updateBlock } from "../api/blocks";

function PageView() {
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    setError(null);
    setPage(null);
    getPageBySlug(slug)
      .then(setPage)
      .catch(err => setError(err.message));
  }, [slug]);

  function handleBlockAdded(block) {
    setPage(prev => ({
      ...prev,
      blocks: [...prev.blocks, block],
    }));
  }

  async function handleDeleteBlock(pageId,blockId) {
  await deleteBlock(pageId,blockId);
  setPage(prev => ({
      ...prev,
      blocks: prev.blocks.filter(b => b.orderIndex !== blockId),
    }));
  }
  async function handleBlockEdited(pageId,block) {
    await editBlock(pageId,block);
    setPage(prev => ({
        ...prev,
        blocks: prev.blocks.map(b => b.orderIndex === block.orderIndex ? block : b
    ),
      }));
  }

    async function handleUpdate(pageId,block,direction) {
    const newBlocks = await updateBlock(pageId,block,direction);
    setPage(prev => ({
      ...prev,
      blocks: newBlocks,
    }));
    }
  if (error)   return (
    <NotFound />
  );
  if (!page) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="page-title">{page.title}</h2>
      {page.blocks.map(block => (
      <Block
        key={block.orderIndex}
        block={block}
        pageId={page.id}
        onUpdate={handleUpdate}
        onEdit={handleBlockEdited}
        onDelete={handleDeleteBlock}
        
      />
        ))}

      <AddBlockForm
        pageId={page.id}
        onBlockAdded={handleBlockAdded}
      />

    </div>
  );
}

export default PageView;