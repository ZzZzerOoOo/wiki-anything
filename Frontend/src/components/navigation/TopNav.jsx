import { Layout, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#9cc6db",
        borderBottom: "2px solid #FCF6D9",
        padding: "0 24px",
      }}
    >
      <Title
        level={1}
        style={{ margin: 0, cursor: "pointer" }}
        onClick={() => navigate("/")}
      >Wiki Anything
      </Title>

      {/* <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate("/pages/new")}
      >
        Create Page
      </Button> */}
    </Header>
  );
}
