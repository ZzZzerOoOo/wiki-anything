import { List, Typography } from "antd";
import PageListItem from "./PageListItem";

const { Title } = Typography;

export default function RecentPages({ pages }) {
  const recent = [...pages]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  if (recent.length === 0) return null;

  return (
    <>
      <Title level={4}>Recent Pages</Title>
      <List
        bordered
        dataSource={recent}
        renderItem={(page) => <PageListItem page={page} />}
      />
    </>
  );
}
