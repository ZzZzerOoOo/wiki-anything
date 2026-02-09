import { useEffect, useState } from "react";
import Block from "./../components/blocks/Block";
import { getPageBySlug } from "./../api/pages";
import AddBlockForm from "./../components/blocks/AddBlockForm";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";
import { deleteBlock,editBlock, updateBlock } from "../api/blocks";
import { Button, Modal, Form ,Typography} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deletePage } from "../api/pages";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/common/Header";

function PageView() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);
  const { Title, Paragraph } = Typography;

  const navigate = useNavigate();

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
  function confirmDelete() {
    Modal.confirm({
      title: "Delete Page?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        console.log(page.slug);
        await deletePage(page.slug);  
        navigate("/");
      },
    });
  }
  if (!page) return <p>Loading...</p>;

  return (
    <div>
  
      <Header />
       <Title level={2}>{page.title}</Title>
       <Paragraph type="secondary" style={{fontSize: 14}}>Last updated: {new Date(page.updatedAt).toLocaleString()}</Paragraph>
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

    <Button
        type="dashed"
        block
        danger
        icon={<DeleteOutlined />}
        style={{ marginTop: 16 }}
        onClick={confirmDelete}
      >
        + Delete page
    </Button>
    </div>
  );
}

export default PageView;