import { List, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function WikiListItem({ wiki }) {
  const navigate = useNavigate();

  return (
    <List.Item 
      onClick={() => navigate(`/wiki/${wiki.slug}`)}
      
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
        title={wiki.title}
        description={
          <>

            <Text type="secondary" style={{ fontSize: 12 }}>
              Updated: {new Date(wiki.updatedAt).toLocaleDateString()}
            </Text>
          </>
        }
      />
    </List.Item>
  );
}
