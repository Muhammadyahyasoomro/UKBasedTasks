import React from 'react';
import { useSearch } from '../context/SearchContext';
import { Lightbulb } from 'react-bootstrap-icons';
import { useTheme } from '../context/ThemeContext';

export default function NavbarHome() {
    const { search, setSearch } = useSearch(); // Access search context
    const { toggleTheme, theme } = useTheme(); // Access theme context

    const handleSearchChange = (e) => {
        setSearch(e.target.value); // Update search term in context
    };

    // Determine navbar theme based on current theme
    const navbarClass = theme === 'light' ? 'navbar-light bg-light' : 'navbar-dark bg-dark';
    const buttonClass = theme === 'light' ? 'btn-outline-dark' : 'btn-outline-light';
    const lightbulbColor = theme === 'light' ? 'black' : 'yellow';

    return (
        <nav className={`navbar navbar-expand-lg ${navbarClass}`  } style={{position:"fixed" ,zIndex:"1000",width:"100%",top:0}} >
            <div className="container-fluid">
                <a className="navbar-brand" href="#">FakeStoreApi</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                    </ul>
                    <form className="d-flex me-auto">
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search Products by name" 
                            aria-label="Search" 
                            value={search || ''} 
                            onChange={handleSearchChange} // Handle search input change
                        />
                        <button className={`btn ${buttonClass}`} type="submit" onClick={(e) => e.preventDefault()}>Search</button>
                    </form>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button 
                                className="btn d-flex align-items-center"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                                onClick={toggleTheme} // Toggle theme on button click
                                aria-label="Toggle theme"
                            >
                                <span className="me-2" style={{ color: lightbulbColor}}>{theme === 'light' ? 'Turn On' : 'Turn Off'}</span>
                                <Lightbulb style={{ color: lightbulbColor }} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
