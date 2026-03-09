import { Layout } from "antd";
import TopNav from "../navigation/TopNav";

const { Content } = Layout;

export default function AppLayout({ children }) {
  return (
    <Layout >
      <TopNav />
        <Content >
          {children}
        </Content>
    </Layout>
  );
}
