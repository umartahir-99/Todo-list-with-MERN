import { useNavigate, useParams } from "react-router-dom";
import { Typography, Form, Input, Button, DatePicker, Select } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

const { Title } = Typography;
const { Item } = Form;
const { Option } = Select;

const initialState = {
  title: "",
  dueDate: "",
  description: "",
  priority: "",
};
const Edit = () => {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  useEffect(() => {
    const { id } = params;
    const token = localStorage.getItem("jwt");
    axios
      .get(`http://localhost:8000/todos/single/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          const { todo } = data;
          console.log("todo", todo);
          setState(todo);
        }
      })
      .catch((error) => {
        console.error(error);
        window.toastify("Something went wrong while getting todo", "error");
      });
  }, [params]);

  const handleSubmit = () => {
    let { title, dueDate, description, priority, status, isCompleted } = state;
    title = title.trim();

    if (title.length < 3) {
      return window.toastify("Please enter title", "error");
    }

    const { id } = params;

    const todo = {
      id,
      title,
      dueDate,
      description,
      priority,
      status,
      isCompleted,
    };

    setIsProcessing(true);

    const token = localStorage.getItem("jwt");
    axios
      .patch("http://localhost:8000/todos/update", todo, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          const { todo } = data;
          console.log("todo", todo);
          window.toastify("A todo has been successfully updated", "success");
          navigate("/dashboard/todos");
        }
      })
      .catch((error) => {
        console.error(error);
        window.toastify("Something went wrong while updating a todo", "error");
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
            Update Todo
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
                value={state.title}
                onChange={handleChange}
              />
            </Item>
            <Item label={`Due Date: ${state.dueDate || ""}`}>
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
                value={state.description}
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
                value={state.priority}
              >
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
              </Select>
            </Item>

            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={isProcessing}
              onClick={handleSubmit}
            >
              Update todo
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Edit;
