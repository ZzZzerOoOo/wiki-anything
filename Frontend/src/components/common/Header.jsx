import { Link } from "react-router-dom";
import {Typography,Layout} from "antd";


function Header() {
const { Header } = Layout;
const { Title } = Typography;
  return (
    <Header>
    <Link to="/" style={{ textDecoration: 'none' }}> <Title level={1}>Wiki Anything</Title></Link>
    </Header>
  );
}
export default Header;
