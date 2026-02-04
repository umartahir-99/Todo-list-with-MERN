import { Typography, Form, Input, Button } from "antd";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/Auth";

const { Title, Paragraph } = Typography;
const { Item } = Form;

const initialState = { email: ""};
const ForgotPassword = () => {
  const { dispatch  } = useAuth();

  const [state, setState] = useState(initialState);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleForgotPassword = () => {
    let { email } = state;
    console.log('email', email)
    navigate("/")

  }
  return (
    <main className="auth flex items-center justify-center min-h-screen bg-gradient-to-r from-[#243B55] to-[#141E30]">
      <div className="container">
        <div className="card px-3 py-4 mx-auto w-full max-w-[500px] bg-white rounded-lg shadow-lg">
          <Title level={1} className="text-center">
            Reset Password
          </Title>
          <Paragraph className="text-center">
           Remember Password?
            <Link to="/auth/register"> Create an account</Link>
          </Paragraph>

          <Form layout="vertical">
            <Item label="Email" required>
              <Input
                type="text"
                size="large"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
              />
            </Item>
           
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
            
              onClick={handleForgotPassword}
            >
              Send Email
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
