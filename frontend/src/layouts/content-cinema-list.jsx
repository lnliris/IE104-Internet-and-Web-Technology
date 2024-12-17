import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../stylesheets/layouts/content-cinema-list.css';

const ContentCinemaList = () => {
    // Backend Integration
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch cinemas from backend
    const fetchCinemas = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/cinemas`);
            setCinemas(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch cinemas');
            console.error('Error fetching cinemas:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Uncomment the following line when backend is ready
        // fetchCinemas();
    }, []);

    // Temporary static data
    const [cinemas, setCinemas] = useState([
        {
            id: 1,
            brandName: 'CGV',
            name: 'Gò Vấp',
            fullName: 'CGV Gò Vấp',
            address: '39 Quang Trung, Phường 3, Quận Gò Vấp, TP.HCM',
            image: 'https://static.doanhnhan.vn/images/upload/quynhchi/12042020/cgv-rap.jpg'
        },
        {
            id: 2,
            brandName: 'Cinestar',
            name: 'Quang Trung',
            fullName: 'CineStar Quang Trung',
            address: '230 Quang Trung, Phường 10, Quận Gò Vấp, TP.HCM',
            image: 'https://cinestar-api.monamedia.net/media/wysiwyg/CinemaImage/01-Quoc-Thanh-masthead.jpg'
        },
        {
            id: 2,
            brandName: 'Cinestar',
            name: 'Quang Trung',
            fullName: 'CineStar Quang Trung',
            address: '230 Quang Trung, Phường 10, Quận Gò Vấp, TP.HCM',
            image: 'https://cinestar-api.monamedia.net/media/wysiwyg/CinemaImage/01-Quoc-Thanh-masthead.jpg'
        },
        {
            id: 2,
            brandName: 'Cinestar',
            name: 'Quang Trung',
            fullName: 'CineStar Quang Trung',
            address: '230 Quang Trung, Phường 10, Quận Gò Vấp, TP.HCM',
            image: 'https://cinestar-api.monamedia.net/media/wysiwyg/CinemaImage/01-Quoc-Thanh-masthead.jpg'
        },
        {
            id: 1,
            brandName: 'CGV',
            name: 'Gò Vấp',
            fullName: 'CGV Gò Vấp',
            address: '39 Quang Trung, Phường 3, Quận Gò Vấp, TP.HCM',
            image: 'https://static.doanhnhan.vn/images/upload/quynhchi/12042020/cgv-rap.jpg'
        },
        {
            id: 2,
            brandName: 'Cinestar',
            name: 'Quang Trung',
            fullName: 'CineStar Quang Trung',
            address: '230 Quang Trung, Phường 10, Quận Gò Vấp, TP.HCM',
            image: 'https://cinestar-api.monamedia.net/media/wysiwyg/CinemaImage/01-Quoc-Thanh-masthead.jpg'
        },
        {
            id: 2,
            brandName: 'Cinestar',
            name: 'Quang Trung',
            fullName: 'CineStar Quang Trung',
            address: '230 Quang Trung, Phường 10, Quận Gò Vấp, TP.HCM',
            image: 'https://cinestar-api.monamedia.net/media/wysiwyg/CinemaImage/01-Quoc-Thanh-masthead.jpg'
        },
    ]);

    // Loading state
    if (loading) return <div className="loading">Loading cinemas...</div>;
    
    // Error state
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="cinema-container">
            <h1>Hệ thống rạp chiếu phim</h1>
    
            <div className="cinema-grid">
                {cinemas.map((cinema) => (
                    <div key={cinema.id} className="cinema-card">
                        <div className="cinema-brand">
                            <span>{cinema.brandName}</span>
                        </div>
                        <img
                            src={cinema.image}
                            alt={cinema.fullName}
                            className="cinema-image"
                        />
                        <div className="cinema-info">
                            <h2 className="cinema-name">{cinema.fullName}</h2>
                            <p className="cinema-address">{cinema.address}</p>
                            <button className="view-schedule-btn">
                                Xem lịch chiếu
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentCinemaList;
