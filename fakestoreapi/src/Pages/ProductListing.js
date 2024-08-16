import React, { useEffect, useState } from 'react';
import NavbarHome from '../Components/NavbarHome';
import ItemCard from './components/ItemCard';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearch } from "../context/SearchContext";
import { useTheme } from '../context/ThemeContext';
export default function ProductListing() {
    const [itemList, setItemList] = useState([]);
    const { search } = useSearch(); // Access search context
    const [searchedItems, setSearchedItems] = useState([]);
    const {theme}=useTheme();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setItemList(data))
            .catch((error) => console.error('Error fetching data:', error)); // Error handling
    }, []);

    useEffect(() => {
        // Filter items based on search term
        if (search) {
            const filteredItems = itemList.filter(item => 
                item.title.toLowerCase().includes(search.toLowerCase())
            );
            setSearchedItems(filteredItems);
        } else {
            setSearchedItems(itemList); // Show all items if search is empty
        }
    }, [search, itemList]);

    return (
        <>
            <NavbarHome />
            <Container className='mt-1' >
                <Row>
                    {searchedItems.length > 0 ? (
                        searchedItems.map((item) => (
                            <Col key={item.id} xs={12} sm={6} md={6} lg={3} className="mb-4">
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
                        <p>Loading...</p> // Loading indicator
                    )}
                </Row>
            </Container>
        </>
    );
}
