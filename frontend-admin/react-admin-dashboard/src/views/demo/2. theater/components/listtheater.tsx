import type { TableProps } from "antd";
import { Input, Modal, Space, Table } from "antd";
import React from "react";

interface DataType {
  key: string;
  brandName: string;
  name: string;
  location: string;
  img: string;
}

const handleDelete = (key: string) => {
  // Implement the delete logic here
  console.log(`Deleting film with key: ${key}`);
};

const handleEdit = (key: string) => {
  const theater = data.find(item => item.key === key);
  if (!theater) return;

  let name = theater.name;
  let location = theater.location;
  let brandName = theater.brandName;
  let img = theater.img;

  Modal.confirm({
    title: 'Edit Theater',
    content: (
      <div>
        <Input 
          defaultValue={brandName} 
          onChange={(e) => brandName = e.target.value} 
          placeholder="Brand Name" 
        />
        <Input 
          defaultValue={name} 
          onChange={(e) => name = e.target.value} 
          placeholder="Name" 
          style={{ marginTop: 10 }} 
        />
        <Input 
          defaultValue={location} 
          onChange={(e) => location = e.target.value} 
          placeholder="Location" 
          style={{ marginTop: 10 }} 
        />
        <Input 
          defaultValue={img} 
          onChange={(e) => img = e.target.value} 
          placeholder="Image URL" 
          style={{ marginTop: 10 }} 
        />
      </div>
    ),
    onOk() {
      console.log(`Updated theater with key: ${key}, brandName: ${brandName}, name: ${name}, location: ${location}, img: ${img}`);
      // Implement the update logic here
    },
  });
};

const data: DataType[] = [
  {
    key: '6747070725ba1f3937f5be61',
    brandName: 'Brand 1',
    name: 'Theater 1',
    location: 'Location 1',
    img: 'https://picsum.photos/200/300',
  },
  // Add more data as needed
];

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Brand Name",
    dataIndex: "brandName",
    key: "brandName",
  },
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
    title: "Theater Image Link",
    dataIndex: "img",
    key: "img",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleEdit(record.key)} style={{ color: 'blue' }}>Edit</a>
        <a onClick={() => handleDelete(record.key)} style={{ color: 'red' }}>Delete</a>
      </Space>
    ),
  },
];

const DemoTable: React.FC = () => <Table columns={columns} dataSource={data} />;

export default DemoTable;