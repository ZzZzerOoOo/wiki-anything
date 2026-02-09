import { Button, Result } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <Result
      title="No pages yet"
      subTitle="Create your first page to get started."
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/pages/new")}
        >
          Create Page
        </Button>
      }
    />
  );
}
