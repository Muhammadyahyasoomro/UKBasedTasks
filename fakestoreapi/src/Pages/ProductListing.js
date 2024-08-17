import React, { useEffect, useState } from 'react';
import NavbarHome from '../Components/NavbarHome';
import ItemCard from './components/ItemCard';
import { Container, Row, Col, Dropdown, Button, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { useSearch } from "../context/SearchContext";
import { useTheme } from '../context/ThemeContext';
import { SortAlphaDown, SortAlphaUp, Filter, Grid, List } from 'react-bootstrap-icons'; // Icons for sorting and filtering

export default function ProductListing() {
    const [itemList, setItemList] = useState([]);
    const { search } = useSearch();
    const [searchedItems, setSearchedItems] = useState([]);
    const { theme } = useTheme();
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortCriteria, setSortCriteria] = useState('price');

    // Filtering state
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
    const [inStockOnly, setInStockOnly] = useState(false);

    // View mode state
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    useEffect(() => {
        fetch('https://fakestoreapi.com/products', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setItemList(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        let filteredItems = search
            ? itemList.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
            : itemList;

        // Apply filters
        if (categoryFilter) {
            filteredItems = filteredItems.filter(item => item.category === categoryFilter);
        }

        if (priceRange) {
            filteredItems = filteredItems.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);
        }

        if (inStockOnly) {
            filteredItems = filteredItems.filter(item => item.rating.count > 0);
        }

        // Sorting logic
        if (sortCriteria === 'price') {
            filteredItems = filteredItems.sort((a, b) =>
                sortOrder === 'asc' ? a.price - b.price : b.price - a.price
            );
        } else if (sortCriteria === 'name') {
            filteredItems = filteredItems.sort((a, b) =>
                sortOrder === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            );
        } else if (sortCriteria === 'rating') {
            filteredItems = filteredItems.sort((a, b) =>
                sortOrder === 'asc' ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate
            );
        }

        setSearchedItems(filteredItems);
    }, [search, itemList, sortOrder, sortCriteria, categoryFilter, priceRange, inStockOnly]);

    // Handlers for filters
    const handleSortOrderToggle = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    const handleSortCriteriaChange = (criteria) => setSortCriteria(criteria);
    const handleCategoryChange = (e) => setCategoryFilter(e.target.value);
    const handlePriceRangeChange = (min, max) => setPriceRange([min, max]);
    const handleInStockChange = (e) => setInStockOnly(e.target.checked);

    // View Mode Handler
    const handleViewModeChange = (mode) => setViewMode(mode);

    return (
        <>
            <NavbarHome />
            <Container style={{ marginTop: "3rem", backgroundColor: theme === "light" ? "white" : "black" }}>
                {/* Filter Controls */}
                <Row className="mb-3">
                    <Col xs={12} md={4} className='mt-4'>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary">
                                <SortAlphaDown /> Sort by {sortCriteria.charAt(0).toUpperCase() + sortCriteria.slice(1)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSortCriteriaChange('price')}>Price</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSortCriteriaChange('name')}>Name</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSortCriteriaChange('rating')}>Rating</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={12} md={4} className='mt-4'>
                        <Button onClick={handleSortOrderToggle} variant="secondary">
                            {sortOrder === 'asc' ? <SortAlphaUp /> : <SortAlphaDown />} Sort {sortOrder === 'asc' ? "Descending" : "Ascending"}
                        </Button>
                    </Col>

                    {/* View Mode Toggle */}
                    <Col xs={12} md={4} className='mt-4 text-end'>
                        <ToggleButtonGroup type="radio" name="viewMode" value={viewMode} onChange={handleViewModeChange}>
                            <ToggleButton variant="outline-secondary" value="grid">
                                <Grid /> Grid View
                            </ToggleButton>
                            <ToggleButton variant="outline-secondary" value="list">
                                <List /> List View
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Col>
                </Row>

                {/* Category Filter */}
                <Row className="mb-3 mt-4" style={{ color: theme === "light" ? "black" : "white" }}>
                    <Col xs={12} md={4}>
                        <Form.Group controlId="categoryFilter">
                            <Form.Label><Filter /> Category</Form.Label>
                            <Form.Control as="select" value={categoryFilter} onChange={handleCategoryChange}>
                                <option value="">All Categories</option>
                                <option value="electronics">Electronics</option>
                                <option value="jewelery">Jewelery</option>
                                <option value="men's clothing">Men's Clothing</option>
                                <option value="women's clothing">Women's Clothing</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    {/* Price Range Filter */}
                    <Col xs={12} md={4}>
                        <Form.Group controlId="priceRange">
                            <Form.Label><Filter /> Price Range</Form.Label>
                            <Form.Control
                                style={{ backgroundColor: theme === "light" ? "white" : "grey" }}
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                            />
                            <Form.Text style={{ color: theme === "light" ? "black" : "white" }}>Up to ${priceRange[1]}</Form.Text>
                        </Form.Group>
                    </Col>

                    {/* Availability Filter */}
                    <Col xs={12} md={4}>
                        <Form.Group controlId="inStock">
                            <Form.Check 
                                type="checkbox" 
                                label="In Stock Only" 
                                checked={inStockOnly} 
                                onChange={handleInStockChange} 
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Product Listing */}
                <Row>
                    {searchedItems.length > 0 ? (
                        viewMode === 'grid' ? (
                            searchedItems.map((item) => (
                                <Col key={item.id} xs={12} sm={6} md={6} lg={3} className="mb-4 mt-4">
                                    <ItemCard
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        description={item.description}
                                        image={item.image}
                                        rating={item.rating.rate}
                                    />
                                </Col>
                            ))
                        ) : (
                            searchedItems.map((item) => (
                                <Col key={item.id} xs={12} className="mb-4 mt-4">
                                    <ItemCard
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        description={item.description}
                                        image={item.image}
                                        rating={item.rating.rate}
                                    />
                                </Col>
                            ))
                        )
                    ) : (
                        <p style={{ color: theme === "light" ? "black" : "white" }}>No products found.</p>
                    )}
                </Row>
            </Container>
        </>
    );
}
