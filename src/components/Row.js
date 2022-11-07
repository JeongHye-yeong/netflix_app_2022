import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/Row.css';
import MovieModal from './MovieModal';

//import Swiper, { Navigation, Pagination } from 'swiper';//기본 값
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'; //기본 값 더추가된 값
import { Swiper, SwiperSlide } from 'swiper/react';//리액트 스와이트

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({isLargeRow, title, id, fetchUrl}) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

//장르별 영화이미지
    useEffect(() => {
        fetchMovieData();
    },[fetchUrl]);//[] 빈 배열이면 처음 랜더링 될때만 실행된다 [fetchUrl]: fetchUrl이 업뎃될때마다 영화를 다시 가져옴

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovies(request.data.results);
    }

//영화 이미지 클릭시 디테일한 정보 보여주기
    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }

  return (
    <section className='row' key={id}>
        <h2>{title}</h2>
        <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      loop={true} // loop 기능을 사용할 것인지
      breakpoints={{ //해상도에 따라 보이는 슬라이드
        1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 몇개씩 슬라이드 할지 
        },
        998: {
            slidesPerView: 5, 
            slidesPerGroup: 5, 
        },
        625: {
            slidesPerView: 4, 
            slidesPerGroup: 4, 
        },
        0: {
            slidesPerView: 3, 
            slidesPerGroup: 3, 
        },
      }}
      navigation // arrow 버튼 사용 유무
      pagination={{ clickable: true }} //페이지 롤링 버튼 보이게 클릭했을떄 이동할지
    >
        {/* <div className='slider'> */}
            {/* <div className='slider__arrow left'>
                <span className='arrow'
                    onClick={() => {
                        document.getElementById(id).scrollLeft -= (window.innerWidth - 80);
                    }}>{"<"}</span>
            </div> */}
            <div id={id}  className="row__posters">
                {movies.map(movie => (
                    <SwiperSlide>
                        <img key={movie.id} 
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                        src={`https://image.tmdb.org/t/p/original/${isLargeRow? movie.poster_path :movie.backdrop_path}`}
                        alt={movie.title || movie.name || movie.original_name}
                        onClick={() => handleClick(movie)} />
                    </SwiperSlide>
                ))}
            </div>
            {/* <div className='slider__arrow right'>
                <span className='arrow'
                onClick={() => {
                    document.getElementById(id).scrollLeft += (window.innerWidth - 80);
                }}>{">"}</span>
            </div> */}
        {/* </div> */}
        </Swiper>
        {modalOpen && (
            <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
        )}
    </section>
  )
}

export default Row