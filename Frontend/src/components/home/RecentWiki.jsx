import { List, Typography } from "antd";
import WikiListItem from "./WikiListItem";

const { Title } = Typography;

export default function RecentWiki({ wiki }) {
  const recent = [...wiki]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  if (recent.length === 0) return null;

  return (
    <>
      <Title level={4}>Recent Wikis</Title>
      <List
        bordered
        dataSource={recent}
        renderItem={(wiki) => <WikiListItem wiki={wiki} />}
      />
    </>
  );
}
