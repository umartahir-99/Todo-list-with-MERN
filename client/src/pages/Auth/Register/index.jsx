import { Typography, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const { Title, Paragraph } = Typography;
const { Item } = Form;

const initialState = { name: "", email: "", password: "", confirmPassword: "" };
const Register = () => {
  const [state, setState] = useState(initialState);
  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleRegister = () => {
    let { name, email, password, confirmPassword } = state;

    const fullName = name.trim();
    if (name.length < 3) {
      return window.toastify("Please enter your name", "error");
    }
    if (!window.isValidEmail(email)) {
      return window.toastify("Please enter your valid email", "error");
    }
    if (password.length < 6) {
      return window.toastify("Password must be atleast 6 characters", "error");
    }
    if (confirmPassword !== password) {
      return window.toastify("Password not match", "error");
    }

    const user = { fullName:name,email,password };
    setIsProcessing(true);
    
    axios.post("http://localhost:8000/auth/register", user)
    .then((res)=>{
      const {status , data} = res
    if(status === 201){
     return window.toastify(data.message, "success")
    }
    })
    .catch(error =>{
      console.error(error)
      return window.toastify("Something went wrong ", "error")
    })
    .finally(()=>{
      setIsProcessing(false)
    })




    const users = JSON.parse(localStorage.getItem("users")) || [];
    let isUserFound = users.find((user) => user.email === email);
    if (isUserFound) {
      setIsProcessing(false);
      return window.toastify("User already exists", "error");
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    setTimeout(() => {
      setIsProcessing(false);

      window.toastify("A new account has been succesfully created", "success");
    }, 500);
  };

  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <main className="auth flex items-center justify-center min-h-screen bg-gradient-to-r from-[#243B55] to-[#141E30]">
      <div className="container">
        <div className="card px-3 py-4 mx-auto w-full max-w-[500px] bg-white rounded-lg shadow-lg">
          <Title level={1} className="text-center">
            Register
          </Title>
          <Paragraph className="text-center">
            Already have an account?<Link to="/auth/login">Login</Link>
          </Paragraph>

          <Form layout="vertical">
            <Item label="Full Name" required>
              <Input
                type="text"
                size="large"
                placeholder="Enter your full name"
                name="name"
                onChange={handleChange}
              />
            </Item>
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
            <Item label="Confirm Password" required>
              <Input
                type="text"
                size="large"
                placeholder="Enter your password again"
                name="confirmPassword"
                onChange={handleChange}
              />
            </Item>
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={isProcessing}
              onClick={handleRegister}
              navigate="/auth/login"
            >
              Create Account
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Register;
