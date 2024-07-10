import React, { useState, useEffect } from 'react';
import "./PageSelector.css";

const apiKey = 'ebea8cfca72fdff8d2624ad7bbf78e4c';
const apiBaseUrl = 'http://api.themoviedb.org/3/movie/now_playing';

const PageSelector = (props) => {
    const [currentPage, setCurrentPage] = useState(props.page);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            fetch(`${apiBaseUrl}?api_key=${apiKey}&page=${currentPage}`).
                then(response => response.json()).
                then(data => { setTotalPages(data.total_pages);
                        props.onGetMovies(data.results)});
        }
        fetchData();
        props.onGetPage(currentPage);
    }, [currentPage]);

    return(
        <div className="selector">
            <nav>
                <button onClick={() => setCurrentPage(1)}>First</button>
                <button onClick={() => {
                    if(currentPage !== 1){
                        setCurrentPage(currentPage - 1)
                    }
                }}>Prev</button>
                <button>{currentPage}</button>
                <button onClick={() => {
                    if(currentPage !== totalPages){
                        setCurrentPage(currentPage + 1);
                    }
                }}>Next</button>
                <button onClick={() => setCurrentPage(totalPages)}>Last</button>
            </nav>
        </div>
    );
}
export default PageSelector;