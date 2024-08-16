import React from 'react';
import { Button, Card } from 'react-bootstrap'; // Importing Button and Card from react-bootstrap
import { StarFill } from 'react-bootstrap-icons'; // Importing StarFill for rating icon
import { useTheme } from '../../context/ThemeContext';

export default function ItemCard({ id, title, price, description, image, rating, onAddToCart }) {
  const { theme } = useTheme();

  // Theme-based styles
  const cardStyle = {
    backgroundColor: theme === "light" ? "white" : "#343a40",
    color: theme === "light" ? "black" : "white",
  };

  const cardTextMuted = {
    color: theme === "light" ? "#6c757d" : "#adb5bd",
  };

  return (
    <Card style={cardStyle} className="mb-4 shadow-sm h-100 d-flex flex-column">
      <Card.Img variant="top" src={image} alt={title} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text style={cardTextMuted}>Price: ${price}</Card.Text>
        <Card.Text className="flex-grow-1">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </Card.Text>
        <div className="d-flex align-items-center mb-3">
          <StarFill color="gold" className="me-2" />
          <span>{rating}</span>
        </div>
        <Button
          variant="danger"
          className="fw-bold border-2 mt-auto"
          onClick={() => onAddToCart(id)} // Correctly handle onClick event
        >
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
