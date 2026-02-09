import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createPage } from "../api/pages";
import Header from "../components/common/Header";

const { Title } = Typography;

export default function NewPage() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const page = await createPage(values);
      message.success("Page created");
      navigate(`/pages/${page.slug}`);
    } catch (error) {
      message.error("Failed to create page");
    }
  };

  return (
    <>
      <Header />

      <div style={{ maxWidth: 600, margin: "0 auto", padding: 32 }}>
       
      <Title level={2}>Create New Page</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Page title" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create Page
        </Button>
      </Form>
    </div>
    </>
  );
}
