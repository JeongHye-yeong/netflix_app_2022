import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailPage() {
    const [movie, setMovie] = useState({});

    let {movieId} = useParams();
    console.log('movieId',movieId);
    console.log('useParams',useParams());

//디테일페이지에 영화정보 가져오기 
    const fetchData = async () => {
        const request = await axios.get(`/movie/${movieId}`);
        console.log('request',request);
        setMovie(request.data);
    }

    //컴포넌트didupdate역할로 생명주기함수
    useEffect(() => {
        fetchData();
    },[movieId]);

    if (!movie) return <div>...loading</div> 
  return (
    <section>
        <img className='modal__poster-img'
         src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
         alt="poster" 
         />
         {/* 디테일한 정보 추가해서 꾸미기 */}
    </section>
  )
}

export default DetailPage