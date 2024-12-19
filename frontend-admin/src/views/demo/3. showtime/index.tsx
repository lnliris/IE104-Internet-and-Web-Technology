import { Button, DatePicker, Form, Input, Modal, Space, Table, message } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
// ...existing code...

const Showtimes = () => {
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentShowtime, setCurrentShowtime] = useState(null);
    const [form] = Form.useForm();

    // API functions to be implemented
    const fetchShowtimes = async () => {
        try {
            setLoading(true);
            // TODO: Implement API call
            // const response = await api.get('/showtimes');
            // setShowtimes(response.data);
        } catch (error) {
            message.error('Failed to fetch showtimes');
        } finally {
            setLoading(false);
        }
    };

    const createShowtime = async (values) => {
        try {
            setLoading(true);
            // TODO: Implement API call
            // await api.post('/showtimes', values);
            // await fetchShowtimes();
            message.success('Showtime created successfully');
        } catch (error) {
            message.error('Failed to create showtime');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateShowtime = async (id, values) => {
        try {
            setLoading(true);
            // TODO: Implement API call
            // await api.put(`/showtimes/${id}`, values);
            // await fetchShowtimes();
            message.success('Showtime updated successfully');
        } catch (error) {
            message.error('Failed to update showtime');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteShowtime = async (id) => {
        try {
            setLoading(true);
            // TODO: Implement API call
            // await api.delete(`/showtimes/${id}`);
            // await fetchShowtimes();
            message.success('Showtime deleted successfully');
        } catch (error) {
            message.error('Failed to delete showtime');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShowtimes();
    }, []);

    const handleEdit = (showtime) => {
        setCurrentShowtime(showtime);
        form.setFieldsValue({
            ...showtime,
            date: moment(showtime.date),
            time: moment(showtime.time, 'HH:mm')
            
        });
        setIsEditMode(true);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteShowtime(id);
            setShowtimes(showtimes.filter(showtime => showtime.id !== id));
        } catch (error) {
            // Error already handled in deleteShowtime
        }
    };

    const handleAdd = () => {
        setIsEditMode(false);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const formattedValues = {
                ...values,
                date: values.date.format('YYYY-MM-DD'),
                time: values.time.format('HH:mm')
            };

            if (isEditMode) {
                await updateShowtime(currentShowtime.id, formattedValues);
                setShowtimes(showtimes.map(showtime => 
                    showtime.id === currentShowtime?.id ? { ...showtime, ...formattedValues } : showtime
                ));
            } else {
                await createShowtime(formattedValues);
                const newShowtime = { id: Date.now(), ...formattedValues };
                setShowtimes([...showtimes, newShowtime]);
            }

            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            // Errors already handled in createShowtime/updateShowtime
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const columns = [
        {
            title: 'Movie Name',
            dataIndex: 'movieName',
            key: 'movieName',
        },
        {
            title: 'Theater Name',
            dataIndex: 'theaterName',
            key: 'theaterName',
        },
        {
            title: 'Room Name',
            dataIndex: 'roomName',
            key: 'roomName',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: { id: any; }) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Showtimes</h1>
            <Button type="primary" onClick={handleAdd}>Add New Showtime</Button>
            <Table dataSource={showtimes} columns={columns} rowKey="id" loading={loading} />
            <Modal title={isEditMode ? "Edit Showtime" : "Add New Showtime"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="movieName" label="Movie Name" rules={[{ required: true, message: 'Please input the movie name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="theaterName" label="Theater Name" rules={[{ required: true, message: 'Please input the theater name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="roomName" label="Room Name" rules={[{ required: true, message: 'Please input the room name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="language" label="Language" rules={[{ required: true, message: 'Please input the language!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please input the date!' }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Please input the time!' }]}>
                        <DatePicker.TimePicker format="HH:mm" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Showtimes;
