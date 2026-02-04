import { useNavigate } from "react-router-dom";
import { Typography, Button, Table, Dropdown,Image } from "antd";
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
    {title:'Image' , dataIndex:'imageURL', render:(imageURL)=>imageURL ? <Image src = {imageURL} className="rounded-full" width={64} height={64}/>:<></>},
    { title: "Title", dataIndex: "title" },
    { title: "Due Date", dataIndex: "dueDate" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (text) => <Text className="text-capitalize">{text}</Text>,
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
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
        <div className="card px-3 py-4 bg-white rounded-lg shadow-lg">
          {/* ✅ Removed mx-auto and max-w-[500px] */}

          <Title level={1} className="text-center">
            Todos
          </Title>

          <Button
            className="mb-5"
            type="primary"
            size="medium"
            onClick={() => {
              navigate("/dashboard/todos/add");
            }}
          >
            Add Todo
          </Button>

          <Table columns={columns} dataSource={todos} loading={isLoading} />
        </div>
      </div>
    </main>
  );
};

export default All;
