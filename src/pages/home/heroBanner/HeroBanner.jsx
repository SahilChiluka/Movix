import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Image';

import "./style.scss";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const {url} = useSelector((state) => state.home);

    const {data , loading} = useFetch("/movie/upcoming");

    const navigate = useNavigate();

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    const searchQueryHandler = (event) => {
        if(event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    }

  return (
    <div className='heroBanner'>
    
      {!loading && <div className='backdrop-img'>
        <Img src={background} />
       </div>}

       <div className='opacity-layer'></div>

       <ContentWrapper>
       <div className='heroBannerContent'>
                <span className='title'>Welcome.</span>
                <span className='subTitle'>
                    Millons of movies, TV shows and people to discover.
                    Explore now.
                </span>
                <div className='searchInput'>
                    <input 
                      type='text'
                      placeholder='Search for a movie or tv show...'
                      onKeyUp={searchQueryHandler}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <button onClick={() => navigate(`/search/${query}`)}>Search</button>  
                </div>
            </div>
       </ContentWrapper>
    </div>
  )
}

export default HeroBanner