import React, { useRef } from 'react';
import '../styles/MovieModal.css';
import useOnClickOutside from '../hooks/useOnClickOutside';

function MovieModal({backdrop_path, title, overview, name, release_date, first_air_date,vote_average,setModalOpen}) {
    
    //useRef : ID 역할 함수
    //useRef = dom을 직접 선택해야 할 경우들 1. 엘리먼트 크기 가져올때 2.스크롤바 위치 가져올때 3.엘리먼트에 포커스를 설정해줘야 할때 등등
    //useOnClickOutside 훅함수를 호출했고 ref,setModalOpen(false); 두개의 값을 인자값으로 전달함
    const ref = useRef();
    useOnClickOutside(ref, () => {setModalOpen(false);})

    return (
    <div className='presentation'>
        <div className='wrapper-modal'>
            <div className='modal' ref={ref}>
                <span className='modal__close' onClick={() => setModalOpen(false)}>X</span>
                <img className='modal__poster-img' alt={title ? title : name} 
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}/>
                <div className='modal__content'>
                    <p className='modal__details'>
                        <span className='modal__user_perc'>100% for you</span> {"  "}
                        {release_date ? release_date : first_air_date}
                    </p>
                    <h2 className='modal__title'>{title ? title : name}</h2>
                    <p className='modal__details'> 평점: {vote_average}</p>
                    <p className='modal__overview'>{overview}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
//{"  "}공간 띄우는 역할
//{title ? title : name} title이 있으면 타이틀을 넣고 없으면 name으로 적용되라
export default MovieModal