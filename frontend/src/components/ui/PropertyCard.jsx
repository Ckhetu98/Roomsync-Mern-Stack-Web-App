// src/components/PropertyCard.jsx
import React from "react";

const PropertyCard = ({ property, onBookClick }) => {
  const {
    id,
    name,
    location,
    price,
    type,
    occupancy,
    amenities,
    description,
    image,
    rating,
    available,
  } = property;

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={image || "https://via.placeholder.com/600x320?text=No+Image"}
        className="card-img-top"
        alt={name}
        style={{ height: 180, objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary">{name}</h5>
        <p className="card-text mb-1"> <strong>{location}</strong></p>
        <p className="card-text mb-1"> <strong>₹{Number(price).toFixed(2)}</strong></p>
        <p className="card-text mb-1"> {type} • {occupancy}</p>
        <p className="card-text small text-truncate" title={description || ""}>
          {description || "No description provided."}
        </p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className={available ? "text-success" : "text-danger"}>
              {available ? "Available" : "Not Available"}
            </small>
            <small> {rating ?? "0.00"}</small>
          </div>

          <button
            className="btn btn-outline-primary w-100"
            onClick={() => onBookClick(property)}
            disabled={!available}
          >
            {available ? "Book Now" : "Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
