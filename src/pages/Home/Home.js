import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import './Home.css';
import { IoIosStar } from "react-icons/io";
// import Movies from '../../components/Movies/Movies';
import Popular from '../../components/Popular/Popular';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect( () => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=b22286e95cee300300efc5199fdf32be&language=en-US')
        .then(res => res.json())
        .then(data => setPopularMovies(data.results));
    },[])
    return (
        <>
            <div className="banner">
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
                >
                {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img alt="Img Not Found" src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average :""}
                                            <span className='icon'><IoIosStar /></span>
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
            </Carousel>
            <Popular popularMovies={popularMovies}/>
            </div>
        </>
    );
};

export default Home;