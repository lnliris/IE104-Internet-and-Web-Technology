import { Button, DatePicker, Form, Input, Modal, Space, Table, message, Select } from 'antd';
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
    const [theaters, setTheaters] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedTheater, setSelectedTheater] = useState(null);

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
            const response = await axios.get(`http://localhost:8081/movie/${movieId}/showtimeIds`);
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
    const createShowtime = async (values,id) => {
        try {
            setLoading(true);
            console.log('huhu',values)
            // API request to create a new showtime
            const response = await axios.post(`http://localhost:8081/movie/${id}/showtimes`, {
                theaterName: values.theaterName,
                roomName: values.roomName,
                date: values.date.format('YYYY-MM-DD'),  // Định dạng ngày cho đúng yêu cầu backend
                language: values.language,
            });
    
            // On success, fetch updated showtimes
            await fetchShowtimes(selectedMovie.id);
            message.success('Showtime created successfully');
        } catch (error) {
            message.error('Failed to create showtime');
            console.log(error)
            throw error;  // Propagate error for further handling if needed
        } finally {
            setLoading(false);
        }
    };
    

    const updateShowtime = async (id, values) => {
        try {
            setLoading(true);
    
            // API request to update a showtime
            const response = await axios.put(`http://localhost:8081/movie/showtimes/${id}`, {
                theaterName: values.theaterName,
                roomName: values.roomName,
                date: values.date.format('YYYY-MM-DD'),  // Format date to match backend expected format
                language: values.language,
            });
    
            // On success, fetch updated showtimes
            await fetchShowtimes();
            message.success('Showtime updated successfully');
        } catch (error) {
            message.error('Failed to update showtime');
            throw error;  // Propagate error for further handling if needed
        } finally {
            setLoading(false);
        }
    };
    

    const deleteShowtime = async (id,movieId) => {
        try {
            console.log('showtime',id)
            setLoading(true);
            await axios.delete(`http://localhost:8081/movie/${movieId}/showtimes/${id}`);  // Gọi API xóa showtime
            await fetchShowtimes(selectedMovie.id);  // Lấy lại showtimes sau khi xóa
            message.success('Showtime deleted successfully');
        } catch (error) {
            message.error('Failed to delete showtime',error);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchTheaters = async () => {
        try {
            const response = await axios.get('http://localhost:8081/theater/all');
            setTheaters(response.data);
            console.log(theaters)
        } catch (error) {
            console.error("Error fetching theaters:", error);
            message.error('Failed to fetch theaters');
        }
    };

    const fetchRooms = async (theaterId) => {
        try {
            console.log('fetchrooom',theaterId)
            const response = await axios.get(`http://localhost:8081/theater/${theaterId}/rooms`);
            setRooms(response.data.rooms);
        } catch (error) {
            console.error("Error fetching rooms:", error);
            message.error('Failed to fetch rooms');
        }
    };

    useEffect(() => {
        fetchMovies();
        fetchTheaters();
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

    const handleDelete = async (id,movieId) => {
        try {
            console.log('hihi',id)
            await deleteShowtime(id,movieId);  // Gọi hàm xóa showtime
            setShowtimes(showtimes.filter(showtime => showtime.id !== id));  // Cập nhật danh sách showtimes
        } catch (error) {
            // Lỗi đã được handle trong hàm deleteShowtime
        }
    };
    

    const handleAdd = () => {
        setIsEditMode(false);
        setIsModalVisible(true);
        setCurrentShowtime({}); // Reset currentShowtime
        form.setFieldsValue({}); // Reset form fields
    };
    
    const handleOk = async () => {
        try {
            const values = await form.validateFields();  // Validate form fields
            const formattedValues = {
                ...values,
                date: values.date instanceof moment ? values.date.format('YYYY-MM-DD') : values.date,  // Check and format date if it's a moment instance
                time: values.time instanceof moment ? values.time.format('HH:mm') : values.time,  // Format time if it's a moment instance
            };
    
            if (isEditMode) {
                // Nếu đang ở chế độ chỉnh sửa, gọi updateShowtime
                await updateShowtime(currentShowtime.id, formattedValues);
                setShowtimes(showtimes.map(showtime => 
                    showtime.id === currentShowtime?.id ? { ...showtime, ...formattedValues } : showtime
                ));
            } else {
                console.log(selectedMovie)
                await createShowtime(formattedValues,selectedMovie.id);  // Nếu không thì tạo showtime mới
            }
    
            setIsModalVisible(false);  // Ẩn modal
            form.resetFields();         // Reset form fields
        } catch (error) {
            // Handle errors from form validation or API calls
        }
    };
    

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleTheaterChange = (theaterId) => {
        setSelectedTheater(theaterId); 
        form.setFieldsValue({ roomName: undefined }); 
        fetchRooms(theaterId); 
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
            dataIndex: ['screening_room_id', 'theater_id', 'name'],
            key: 'theaterName',
        },
        {
            title: 'Room Name',
            dataIndex: ['screening_room_id', 'name'],
            key: 'roomName',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: { _id: any; }) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record._id,selectedMovie.id)}>Delete</Button>
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
                    <Form.Item 
                        name="theaterName" 
                        label="Theater Name" 
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Select a theater"
                            onChange={handleTheaterChange}
                        >
                            {theaters.map(theater => (
                                <Select.Option 
                                    key={theater._id} 
                                    value={theater._id}
                                >
                                    {theater.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        name="roomName" 
                        label="Room Name" 
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Select a room"
                            disabled={!selectedTheater}
                        >
                            {rooms.map(room => (
                                <Select.Option 
                                    key={room._id} 
                                    value={room._id}
                                >
                                    {room.name}
                                </Select.Option>
                            ))}
                        </Select>
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
