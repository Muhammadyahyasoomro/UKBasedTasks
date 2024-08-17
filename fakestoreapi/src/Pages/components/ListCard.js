import React from "react";
import { Button, Card } from "react-bootstrap"; // Import necessary components from react-bootstrap
import { useTheme } from "../../context/ThemeContext"; // Import custom theme context

export default function ListCard({
  id,
  title,
  price,
  description,
  image,
  rating,
  onAddToCart,
}) {
  const { theme } = useTheme(); // Access the current theme (light or dark)

  // Define styles that adjust based on the theme
  const cardStyles = {
    backgroundColor: theme === "dark" ? "#333" : "#fff", // Dark background for dark mode, light for light mode
    color: theme === "dark" ? "#fff" : "#000", // Light text in dark mode, dark text in light mode
  };

  const buttonVariant = theme === "dark" ? "outline-light" : "danger"; // Different button variants based on theme

  return (
    <Card className="mb-4 shadow-sm" style={cardStyles}>
      <div className="row g-0">
        <div className="col-md-4 col-12 d-flex justify-content-center align-items-center">
          <Card.Img
            src={image}
            alt={title}
            className="img-fluid rounded-start"
            style={{ objectFit: "cover", maxWidth: "50%", height: "auto" }}
          />
        </div>
        <div className="col-md-8 col-12">
          <Card.Body
            className="d-flex flex-column p-3"
            style={{ color: cardStyles.color }}
          >
            <Card.Title>{title}</Card.Title>
            <Card.Text>Price: ${price}</Card.Text>
            <Card.Text>{description}</Card.Text>
            <div className="d-flex align-items-center mb-3">
              <span className="me-2">Rating:</span>
              <strong>{rating}</strong>
            </div>
            <Button
              disabled={true}
              variant={buttonVariant}
              className="mt-auto align-self-start align-self-md-end"
              onClick={() => onAddToCart(id)}
            >
              Add To Cart
            </Button>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}
