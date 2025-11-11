import React from 'react';

const images = [
  '/images/hostel-out.jpg',
  '/images/hostel-out2.jpg',
  '/images/hostel-room.jpg',
  '/images/hostel-room3.jpg'
];

const ImagesPage = () => (
  <div className="gallery-container">
    <h2>Hostel Gallery</h2>
    <div className="gallery-list">
      {images.map((src, idx) => (
        <div className="gallery-image-card" key={idx}>
          <img src={src} alt={`Hostel ${idx + 1}`} />
        </div>
      ))}
    </div>
    <style jsx>{`
      .gallery-container {
        max-width: 500px;
        margin: 0 auto;
        padding: 2rem 1rem;
        text-align: center;
      }
      .gallery-list {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
      }
      .gallery-image-card {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        padding: 1rem;
        width: 100%;
        max-width: 400px;
        transition: box-shadow 0.2s;
      }
      .gallery-image-card:hover {
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      }
      .gallery-image-card img {
        width: 100%;
        height: 260px;
        object-fit: cover;
        border-radius: 12px;
        display: block;
      }
      h2 {
        margin-bottom: 2rem;
        color: #233647;
        font-size: 2rem;
        font-weight: 700;
      }
    `}</style>
  </div>
);

export default ImagesPage;
