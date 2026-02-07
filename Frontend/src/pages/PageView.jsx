import { useEffect, useState } from "react";
import Block from "./../components/Block";
import { getPageBySlug } from "./../api/pages";
import AddBlockForm from "./../components/AddBlockForm";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";
import { deleteBlock,editBlock, updateBlock } from "../api/blocks";
import { Button, Modal, Form } from "antd";

function PageView() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
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
  const updatedBlocks = await deleteBlock(pageId,blockId);
  setPage(prev => ({
      ...prev,
      blocks: updatedBlocks,
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

    <Button
        type="dashed"
        block
        style={{ marginTop: 16 }}
        onClick={() => setOpen(true)}
      >
        + Add Block
    </Button>

    <Modal
        title="Add Block"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Add"
      >
      <AddBlockForm
        pageId={page.id}
        onBlockAdded={(block) => {
          handleBlockAdded(block);
          setOpen(false);
        }}
        form={form}
      />
    </Modal>

    </div>
  );
}

export default PageView;