import React from 'react';
import { Button, Card } from 'react-bootstrap'; // Import necessary components from react-bootstrap

export default function ListCard({ id, title, price, description, image, rating, onAddToCart }) {
  return (
    <Card className="mb-4 d-flex flex-row align-items-center shadow-sm">
      <Card.Img
        variant="left"
        src={image}
        alt={title}
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title>{title}</Card.Title>
        <Card.Text>Price: ${price}</Card.Text>
        <Card.Text>{description}</Card.Text>
        <div className="d-flex align-items-center mb-3">
          <span className="me-2">Rating:</span>
          <strong>{rating}</strong>
        </div>
        <Button
          variant="danger"
          className="mt-auto"
          onClick={() => onAddToCart(id)}
        >
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
