import { Col, Row, Typography, Space } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Hero = () => {
  return (
    <div className="flex items-center min-h-screen ">
      <div className="container">
        <Row>
          <Col span={24} className="text-center">
            <Title className="text-center">Hero</Title>
            <Space>
              <Link
                to="/"
                className="border-2 px-4 py-2 rounded-lg !bg-blue-900 !text-white"
              >
                Frontend
              </Link>
              <br />
              <Link
                to="/dashboard/todos"
                className="border-2 px-4 py-2 rounded-lg !bg-blue-900 !text-white"
              >
           
                Todos
              </Link>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Hero;
