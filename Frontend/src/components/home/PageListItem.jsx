import { List, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function PageListItem({ page }) {
  const navigate = useNavigate();

  return (
    <List.Item 
      onClick={() => navigate(`/pages/${page.slug}`)}
      
        style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 14,
              lineHeight: 1.6,
              backgroundColor: "#FCF6D9",
              borderRadius: 6,
              cursor: "pointer",
              borderLeft: "4px solid #CF4B00",
              // borderBlockColor:   "#DDBA7D",
              marginBottom: 12,
              // padding: 16,  
            }}
    >
      <List.Item.Meta
        title={page.title}
        description={
          <>

            <Text type="secondary" style={{ fontSize: 12 }}>
              Updated: {new Date(page.updatedAt).toLocaleDateString()}
            </Text>
          </>
        }
      />
    </List.Item>
  );
}
