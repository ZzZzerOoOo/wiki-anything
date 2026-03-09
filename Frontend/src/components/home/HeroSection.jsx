import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div>
      <Paragraph type="secondary">
        A block-based wiki for organizing knowledge. Click below to generate your first page and start building your wiki! 
      </Paragraph>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="medium"
        onClick={() => navigate("/pages/new")}
      >
        Create New Page
      </Button>
    </div>
  );
}
