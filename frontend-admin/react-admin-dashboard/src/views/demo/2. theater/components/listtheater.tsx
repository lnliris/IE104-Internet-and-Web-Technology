import React, { useEffect, useState } from "react";
import axios from "axios";
import type { TableProps } from "antd";
import { Space, Table, Modal, Input, message } from "antd";

interface DataType {
  key: string;
  name: string;
  location: string;
}

const DemoTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]); // State để lưu dữ liệu từ API
  const [loading, setLoading] = useState<boolean>(false); // State loading

  // Hàm fetch danh sách rạp chiếu phim từ API
  const fetchTheaters = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8081/theater/all");
      const transformedData = response.data.map((theater: any) => ({
        key: theater._id, // key từ backend (MongoDB ID)
        name: theater.name,
        location: theater.location,
      }));
      setData(transformedData); // Cập nhật state với dữ liệu đã chuyển đổi
    } catch (error) {
      console.error("Failed to fetch theaters:", error);
      message.error("Failed to fetch theaters. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa rạp chiếu phim
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action will delete the theater permanently.",
      onOk: async () => {
        console.log(`Deleting theater with key: ${key}`);
        await fetchTheaters(); // Gọi lại hàm fetchTheaters để cập nhật danh sách
      },
    });
  };

  // Hàm chỉnh sửa thông tin rạp chiếu phim
  const handleEdit = (key: string) => {
    const theater = data.find((item) => item.key === key);
    if (!theater) return;

    let name = theater.name;
    let location = theater.location;

    Modal.confirm({
      title: "Edit Theater",
      content: (
        <div>
          <Input
            defaultValue={name}
            onChange={(e) => (name = e.target.value)}
            placeholder="Name"
          />
          <Input
            defaultValue={location}
            onChange={(e) => (location = e.target.value)}
            placeholder="Location"
            style={{ marginTop: 10 }}
          />
        </div>
      ),
      onOk: async () => {
        console.log(`Editing theater with key: ${key}`);
        console.log(`New values - Name: ${name}, Location: ${location}`);
        await fetchTheaters(); // Gọi lại hàm fetchTheaters để cập nhật danh sách
      },
    });
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchTheaters();
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record.key)} style={{ color: "blue" }}>
            Edit
          </a>
          <a onClick={() => handleDelete(record.key)} style={{ color: "red" }}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default DemoTable;
