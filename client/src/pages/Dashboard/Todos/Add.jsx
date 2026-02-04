import { Typography, Form, Input, Button, DatePicker, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/Auth";
import axios from "axios";

const { Title } = Typography;
const { Item } = Form;
const { Option } = Select;

const Add = () => {
  const initialState = {
    title: "",
    dueDate: "",
    description: "",
    priority: "",
  };

  const { user } = useAuth();

  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [image, setImage]= useState(null)

  const navigate = useNavigate();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  //
  const handleSubmit = () => {
    let { title, dueDate, description, priority } = state;
    title = title.trim();
    if (title.length < 3) {
      return window.toastify("Please enter title", "error");
    }

    const todo = { title, dueDate, description, priority };

    const formData = new FormData();
    for(const key in todo){formData.append(key, todo[key])}
    if(image){formData.append('image', image)}

    setIsProcessing(true);
    const token = localStorage.getItem("jwt");
    axios.post("http://localhost:8000/todos/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { status, data } = res;
        if (status === 201) {
          console.log("todo", data.todo);
          window.toastify(
            "A new todo has been successfully created",
            "success",
          );
        }
      })
      .catch((error) => {
        console.error(error);
        window.toastify(
          "Something went wrong while creating a new todo",
          "error",
        );
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };


  return (
    <main className="auth flex items-center justify-center min-h-screen bg-gradient-to-r from-[#243B55] to-[#141E30]">
      <div className="container ">
        <div className="card px-3 py-4 mx-auto w-full max-w-[500px] bg-white rounded-lg shadow-lg  ">
          <Title level={1} className="text-center">
            Add Todo
          </Title>
          <Button
            className="!py-4 !px-5"
            type="primary"
            onClick={() => {
              navigate("/dashboard/todos");
            }}
          >
            Todos
          </Button>

          <Form layout="vertical">
            <Item label="Title" required>
              <Input
                type="text"
                size="large"
                placeholder="Enter todo title"
                name="title"
                onChange={handleChange}
              />
            </Item>
            <Item label="Due Date">
              <DatePicker
                size="large"
                placeholder="Enter due date"
                onChange={(obj, dueDate) => {
                  setState((s) => ({ ...s, dueDate }));
                }}
                style={{ width: "100%" }}
              />
            </Item>
            <Item label="Description">
              <Input.TextArea
                name="description"
                placeholder="Enter todo description"
                onChange={handleChange}
                style={{ height: 100, resize: "none" }}
              />
            </Item>
            <Item label="Priority">
              <Select
                size="large"
                placeholder="Please select priority"
                onChange={(priority) => {
                  setState((s) => ({ ...s, priority }));
                }}
              >
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
              </Select>
            </Item>

            <Item label="Image">
              <input
                type="file"
                className="block w-full text-sm text-gray-600
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100
             border border-gray-300 rounded-md
             focus:outline-none focus:ring-2 focus:ring-blue-500"
             accept="image/*"
             onChange = {e =>setImage(e.target.files[0])}
              />
            </Item>

            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={isProcessing}
              onClick={handleSubmit}
            >
              Add todo
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Add;
