import { Typography, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/Auth";
import axios from "axios"
const { Title, Paragraph } = Typography;
const { Item } = Form;

const initialState = { email: "", password: "" };
const Login = () => {
  const { readProfile } = useAuth();

  const [state, setState] = useState(initialState);


  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleLogin = () => {
    let { email, password } = state;

    const userData = {email,password}
    setIsProcessing(true);


  axios.post("http://localhost:8000/auth/login", userData)
  .then((res)=>{
  const {status , data}= res
  if (status === 200){
          localStorage.setItem("jwt", data.token);
          readProfile(data.token)
          window.toastify("Login succesfully", "success");
        } else{
          window.toastify(data.message, "error");

        }
  })
  .catch(error=>{
    console.error(error)
    window.toastify(error?.response?.data?.message || "Something went wrong, Internal server error", "error")
  })
  .finally(()=>{
    setIsProcessing(false);
    
  })

  //  const jwt = localStorage.getItem("jwt")
  //   axios.patch("http://localhost:8000/user-update", {fullName:"New name"}, {headers:{Authorization:`Bearer ${jwt}`}})
  // .then((res)=>{
  // const {status , data}= res
  // if (status === 200){
  //         localStorage.setItem("jwt", data.token);
  //         readProfile(data.token)
  //         window.toastify("Login succesfully", "success");
  //       } else{
  //         window.toastify(data.message, "error");

  //       }
  // })
  // .catch(error=>{
  //   console.error(error)
  //   window.toastify(error?.response?.data?.message || "Something went wrong, Internal server error", "error")
  // })
  // .finally(()=>{
  //   setIsProcessing(false);
    
  // })

  //   axios.delete("http://localhost:8000/delete-user", {headers:{Authorization:`Bearer ${jwt}`}})
  // .then((res)=>{
  // const {status , data}= res
  // if (status === 200){
  //         localStorage.setItem("jwt", data.token);
  //         readProfile(data.token)
  //         window.toastify("Login succesfully", "success");
  //       } else{
  //         window.toastify(data.message, "error");

  //       }
  // })
  // .catch(error=>{
  //   console.error(error)
  //   window.toastify(error?.response?.data?.message || "Something went wrong, Internal server error", "error")
  // })
  // .finally(()=>{
  //   setIsProcessing(false);
    
  // })
}

  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <main className="auth flex items-center justify-center min-h-screen bg-gradient-to-r from-[#243B55] to-[#141E30]">
      <div className="container">
        <div className="card px-3 py-4 mx-auto w-full max-w-[500px] bg-white rounded-lg shadow-lg">
          <Title level={1} className="text-center">
            Login
          </Title>
          <Paragraph className="text-center">
            Don't have an account?
            <Link to="/auth/register"> Create an account</Link>
          </Paragraph>
            <Paragraph className="text-center">
            Forgot Password?
            <Link to="/auth/forgot-password"> Reset Password</Link>
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
            <Item label="Password" required>
              <Input
                type="text"
                size="large"
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
              />
            </Item>

            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={isProcessing}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Login;
