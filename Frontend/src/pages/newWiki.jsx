import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createWiki } from "../api/wiki";
import Header from "../components/common/Header";

const { Title } = Typography;

export default function NewWiki() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const wiki = await createWiki(values);
      message.success("Wiki created");
      navigate(`/wiki/${wiki.slug}`);
    } catch (error) {
      message.error("Failed to create wiki");
    }
  };

  return (
    <>
      {/* <Header /> */}

      <div style={{ maxWidth: 600, margin: "0 auto", padding: 32 }}>
       
      <Title level={2}>Create New Wiki!</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Wiki title" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create Page
        </Button>
      </Form>
    </div>
    </>
  );
}
