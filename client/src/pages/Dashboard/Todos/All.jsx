import { useNavigate } from "react-router-dom";
import { Typography, Button, Table, Dropdown, Image } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
const { Title, Text } = Typography;
const All = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);

    const token = localStorage.getItem("jwt");
    axios
      .get("http://localhost:8000/todos/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          const { todos } = data;
          console.log("todos", todos);
          setTodos(todos.map((todo) => ({ ...todo, key: todo.id })));
        }
      })
      .catch((error) => {
        console.error(error);
        window.toastify("Something went wrong while getting todos", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (todo) => {
    const token = localStorage.getItem("jwt");
    axios
      .delete(`http://localhost:8000/todos/single/${todo.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          const filteredTodos = todos.filter((item) => item.id !== todo.id);
          setTodos(filteredTodos);

          window.toastify("Todo deleted successfully", "success");
        }
      })
      .catch((error) => {
        console.error(error);
        window.toastify("Something went wrong while getting todo", "error");
      });
    console.log("todo", todo);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageURL",
      responsive: ["sm"],
      render: (imageURL) =>
        imageURL ? (
          <Image
            src={imageURL}
            className="rounded-full"
            width={48}
            height={48}
          />
        ) : (
          <></>
        ),
    },
    { title: "Title", dataIndex: "title" },
    { title: "Due Date", dataIndex: "dueDate", responsive: ["md"] },
    { title: "Description", dataIndex: "description", responsive: ["lg"] },
    {
      title: "Priority",
      dataIndex: "priority",
      responsive: ["md"],
      render: (text) => <Text className="text-capitalize">{text}</Text>,
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      responsive: ["xl"],
      render: (text) => (
        <Text className="text-capitalize">
          {dayjs(text).format("dddd, DD-MMM-YY, hh:mm:ss A")}
        </Text>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              // {
              //   label: "Edit",
              //   key: "edit",
              //   icon: <EditOutlined />,
              //   onClick: () => {navigate("/dashboard/todos/edit" + record.id)},
              // },
              {
                label: "Edit",
                key: "edit",
                icon: <EditOutlined />,
                onClick: () => {
                  navigate(`/dashboard/todos/edit/${record.id}`);
                },
              },
              {
                label: "Delete",
                key: "delete",
                icon: <DeleteOutlined />,
                onClick: () => {
                  handleDelete(record);
                },
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button className="!border-0" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <main className="py-5">
      <div className="container">
        <div className="card px-3 py-4 bg-white rounded-lg shadow-lg overflow-x-auto">
          {/* ✅ Removed mx-auto and max-w-[500px] */}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
            <Title level={2} className="!m-0 text-center sm:text-left">
              Todos
            </Title>

            <Button
              className="!bg-blue-900 !text-white w-full sm:w-auto"
              size="middle"
              onClick={() => {
                navigate("/dashboard/todos/add");
              }}
            >
              Add Todo
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={todos}
            loading={isLoading}
            pagination={{ pageSize: 8, showSizeChanger: false }}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </main>
  );
};

export default All;
