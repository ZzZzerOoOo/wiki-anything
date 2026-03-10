import { List, Typography } from "antd";
import WikiListItem from "./WikiListItem";
import EmptyState from "../common/EmptyState";

const { Title } = Typography;

export default function AllWikis({ wiki }) {
  return (
    <>
      <Title level={4}>All Wiki</Title>

      {wiki.length === 0 ? (
        <EmptyState />
      ) : (
        <List
          bordered
          dataSource={wiki}
          renderItem={(wiki) => <WikiListItem wiki={wiki} />}
        />
      )}
    </>
  );
}
