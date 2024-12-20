import { Button, DatePicker, Form, Input, Modal, Space, Table, message } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import axios from 'axios';

// ...existing code...

const Showtimes = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentShowtime, setCurrentShowtime] = useState(null);
    const [form] = Form.useForm();

    // Updated fetchMovies function
    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8081/movie/all');
            const movies = response.data.movies || response.data;

            if (!Array.isArray(movies)) {
                throw new Error("API response is not an array");
            }

            const transformedData = movies.map((movie: any) => ({
                id: movie._id,
                name: movie.title,
                description: movie.description,
                duration: movie.duration,
                genre: movie.genre,
                rating: movie.rating,
                limit_age: movie.limit_age,
                poster_url: movie.poster_url,
            }));

            setMovies(transformedData);
        } catch (error) {
            console.error("Error fetching movies:", error);
            message.error('Failed to fetch movies');
        } finally {
            setLoading(false);
        }
    };
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
    // Fetch showtimes for selected movie
    const fetchShowtimes = async (movieId) => {
        try {
            console.log(movieId)
            setLoading(true);
            const response = await axios.get(`http://localhost:8081/movie/${movieId}/showtimes`);
            console.log(response.data)
            const formattedShowtimes = response.data.map(showtime => ({
                ...showtime,
                date: formatDateTime(showtime.date)
            }));
            setShowtimes(formattedShowtimes || []);
        } catch (error) {
            message.error('Failed to fetch showtimes');
        } finally {
            setLoading(false);
        }
    };
    

    // Modified to include movieId
    const createShowtime = async (values) => {
        try {
            setLoading(true);
            // TODO: Implement API call
            // await api.post(`/movies/${selectedMovie.id}/showtimes`, values);
            // await fetchShowtimes(selectedMovie.id);
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
        fetchMovies();
    }, []);

    useEffect(() => {
        if (selectedMovie) {
            fetchShowtimes(selectedMovie.id);
        }
    }, [selectedMovie]);

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

    const movieColumns = [
        {
            title: 'Movie Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => setSelectedMovie(record)}>
                    Manage Showtimes
                </Button>
            ),
        },
    ];

    const columns = [
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
            <h1>Movie Showtimes Management</h1>
            
            {!selectedMovie ? (
                <>
                    <h2>Select a Movie</h2>
                    <Table 
                        dataSource={movies} 
                        columns={movieColumns} 
                        rowKey="id" 
                        loading={loading} 
                    />
                </>
            ) : (
                <>
                    <Space style={{ marginBottom: 16 }}>
                        <Button onClick={() => setSelectedMovie(null)}>
                            Back to Movies
                        </Button>
                        <Button type="primary" onClick={handleAdd}>
                            Add New Showtime
                        </Button>
                    </Space>
                    <h2>Showtimes for {selectedMovie.name}</h2>
                    <Table 
                        dataSource={showtimes} 
                        columns={columns} 
                        rowKey="id" 
                        loading={loading} 
                    />
                </>
            )}

            <Modal 
                title={isEditMode ? "Edit Showtime" : "Add New Showtime"} 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="theaterName" label="Theater Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="roomName" label="Room Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="language" label="Language" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name="time" label="Time" rules={[{ required: true }]}>
                        <DatePicker.TimePicker format="HH:mm" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Showtimes;
