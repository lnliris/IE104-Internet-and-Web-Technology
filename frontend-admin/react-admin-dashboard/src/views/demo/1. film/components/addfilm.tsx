import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import * as XLSX from "xlsx";

const { TextArea } = Input;

const FormPage: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        form.resetFields();
        alert('Form submitted successfully!');
        console.log('Form values:', values);
    };

    const handleUpload = (file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            console.log('Excel data:', json);
            // Add your logic to handle the uploaded data
        };
        reader.readAsArrayBuffer(file);
        return false; // Prevent upload
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please enter the title' }]}
                required
                tooltip="This is a required field"
            >
                <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter the description' }]}
                required
                tooltip="This is a required field"
            >
                <TextArea
                    placeholder="Autosize height with minimum and maximum number of lines"
                    autoSize={{ minRows: 3, maxRows: 7 }}
                />
            </Form.Item>

            <Form.Item
                label="Duration"
                name="duration"
                rules={[{ required: true, message: 'Please enter the duration' }]}
                required
                tooltip="This is a required field"
            >
                <Input type="number" placeholder="Enter duration in minutes" />
            </Form.Item>

            <Form.Item
                label="Genre"
                name="genre"
                rules={[{ required: true, message: 'Please enter the genre' }]}
                required
                tooltip="This is a required field"
            >
                <Input placeholder="Enter genre" />
            </Form.Item>

            <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true, message: 'Please enter the rating' }]}
                required
                tooltip="This is a required field"
            >
                <Input type="number" placeholder="Enter rating" />
            </Form.Item>

            <Form.Item
                label="Limit Age"
                name="limit_age"
                rules={[{ required: true, message: 'Please enter the limit age' }]}
                required
                tooltip="This is a required field"
            >
                <Input placeholder="Enter limit age" />
            </Form.Item>

            <Form.Item
                label="Poster URL"
                name="poster_url"
                rules={[{ required: true, message: 'Please enter the poster URL' }]}
                required
                tooltip="This is a required field"
            >
                <Input placeholder="Enter poster URL" />
            </Form.Item>

            <Form.Item label="Upload Film List" tooltip="Upload an Excel file with a list of films">
                <Upload beforeUpload={handleUpload} accept=".xlsx, .xls">
                    <Button icon={<UploadOutlined />}>Upload Excel File</Button>
                </Upload>
            </Form.Item>
            
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default FormPage;
