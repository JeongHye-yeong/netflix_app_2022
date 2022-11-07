import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SearchPage.css';
import { useDebounce } from '../hooks/useDebounce';

//useLocation - 주소창 정보를 가지고오는 hook 함수

function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);
    //console.log('useLocation()',useLocation())

    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    //useQuery-질문임
    //debounceSearchTerm - 글자를 끝까지 쓸떄까지 기다렸다가 영화정보를 가져오겠다.
    //useDebounce - 글자가 다 입력될때까지 searchTerm함수가 호출되지 않음(적용안할시 한글자한글자마다 정보검색이 되서 딜레이가 발생함)
    let query = useQuery();
    const searchTerm = query.get("q");
    const debounceSearchTerm = useDebounce(searchTerm, 500);
    //console.log('searchTerm',searchTerm);

    //컴포넌트didmount역할 -searchTerm값을 가져와서 적용하는것
    //searchTerm값이 바뀔경우 useEffect 호출되고 
    useEffect(() => {
        if(debounceSearchTerm){
            fetchSearchMovie(debounceSearchTerm);    
        }
    },[debounceSearchTerm]);

    //fetchSearchMovie로 영화정보데이터를 가져오는 것
    const fetchSearchMovie = async (searchTerm) =>{
        try{
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`);
            console.log('request',request);
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error",error)
        }
    }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
        <section className="search-container">
            {searchResults.map(movie => {
                if(movie.backdrop_path !== null && movie.media_type !== "person"){
                    const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                    return(
                        <div className="movie" key={movie.id}>
                            {/* 타이틀,네임 검색어로 뜨고 클릭시 디테일창으로 */}
                            <div onClick={() => navigate(`/${movie.id}`)}
                             className="movie__column-poster">
                                <img src={movieImageUrl} 
                                    alt={movie.title || movie.name || movie.original_name}
                                    className="movie__poster" />
                                {/* 영화이름 정보 출시일 평점 추가 */}
                            </div>
                        </div>
                    )
                }
            })}
        </section>
    ) : (
        <section className="no-results">
            <div className="no-results__text">
                <p>
                    찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
                </p>
            </div>
        </section>
    );
  }

  return renderSearchResults();
}

export default SearchPage