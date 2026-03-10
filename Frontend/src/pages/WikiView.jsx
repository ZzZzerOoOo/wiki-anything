import { useEffect, useState } from "react";
import Block from "./../components/blocks/Block";
import { getWikiBySlug } from "./../api/wiki";
import AddPageForm from "./../components/pages/AddPageForm";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";
import { deleteBlock,editBlock, updateBlock } from "../api/blocks";
import { Button, Modal, Form, Typography, Spin, Alert } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deletePage } from "../api/pages";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/common/Header";
import AllPages from "../components/home/AllPages";

const { Title, Paragraph } = Typography;

function WikiView() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [wiki, setWiki] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { slug } = useParams();

  useEffect(() => {
    setError(null);
    setWiki(null);
    setLoading(true);
    getWikiBySlug(slug)
      .then(setWiki)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  function handlePageAdded(page) {
    setWiki(prev => ({
      ...prev,
      pages: [...prev.pages, page],
    }));
  }

//   async function handleDeleteBlock(pageId,blockId) {
//   const updatedBlocks = await deleteBlock(pageId,blockId);
//   setPage(prev => ({
//       ...prev,
//       blocks: updatedBlocks,
//     }));
//   }
//   async function handleBlockEdited(pageId,block) {
//     await editBlock(pageId,block);
//     setPage(prev => ({
//         ...prev,
//         blocks: prev.blocks.map(b => b.orderIndex === block.orderIndex ? block : b
//     ),
//       }));
//   }

    // async function handleUpdate(pageId,block,direction) {
    // const newBlocks = await updateBlock(pageId,block,direction);
    // setPage(prev => ({
    //   ...prev,
    //   blocks: newBlocks,
    // }));
    // }
  if (error)   return (
    <NotFound />
  );
//   function confirmDelete() {
//     Modal.confirm({
//       title: "Delete Page?",
//       content: "This action cannot be undone.",
//       okText: "Delete",
//       okType: "danger",
//       onOk: async () => {
//         console.log(page.slug);
//         await deletePage(page.slug);  
//         navigate("/");
//       },
//     });
//   }

  if (loading) return <Spin size="large" style={{ display: "block", marginTop: 80 }} />;
  if (error) return <Alert type="error" message="Page not found or failed to load." />;

  return (
    <div>
  
      
       <Title level={2}>{wiki.title}</Title>

       <Paragraph type="secondary" style={{fontSize: 14}}>Last updated: {new Date(wiki.updatedAt).toLocaleString()}</Paragraph>
      <AllPages pages={wiki.pages} />

    <Button
        type="dashed"
        block
        style={{ marginTop: 16 }}
        onClick={() => setOpen(true)}
      >
        + Add Page
    </Button>

    <Modal
        title="Add Page"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Add"
      >

      <AddPageForm
        wikiId={wiki.id}
        onPageAdded={(page) => {
          handlePageAdded(page);
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
        // onClick={confirmDelete}
      >
        Delete page
    </Button>
    </div>
  );
}

export default WikiView;