import { List, Typography } from "antd";
import PageListItem from "./PageListItem";
import EmptyState from "../common/EmptyState";

const { Title } = Typography;

export default function AllPages({ pages }) {
  return (
    <>
      <Title level={4}>All Pages</Title>

      {pages.length === 0 ? (
        <EmptyState />
      ) : (
        <List
          bordered
          dataSource={pages}
          renderItem={(page) => <PageListItem page={page} />}
        />
      )}
    </>
  );
}
