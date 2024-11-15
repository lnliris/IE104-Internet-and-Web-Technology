import React, { useEffect, useState } from 'react';

const Promotions = () => {
    const [promotions, setPromotions] = useState([]);

    // Fetch promotions data (mock API call here)
    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                // Replace with your API endpoint or data source
                const response = await fetch('/api/promotions');
                const data = await response.json();
                setPromotions(data);
            } catch (error) {
                console.error('Error fetching promotions:', error);
            }
        };
        
        fetchPromotions();
    }, []);

    return (
        <div className="promotions">
            <h2>Current Promotions</h2>
            {promotions.length > 0 ? (
                <ul>
                    {promotions.map((promo) => (
                        <li key={promo.id} className="promotion-item">
                            <h3>{promo.title}</h3>
                            <p>{promo.description}</p>
                            <a href={promo.link} target="_blank" rel="noopener noreferrer">
                                Learn More
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No promotions available at this time.</p>
            )}
        </div>
    );
};

export default Promotions;