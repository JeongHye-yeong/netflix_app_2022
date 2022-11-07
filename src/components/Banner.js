import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from '../api/requests';
import '../styles/Banner.css';
import styled from 'styled-components';

function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

//fetchData를 useEffect 끝나는 시점에 fetchData() 실행되는 함수
    useEffect(() => {
        fetchData();
    },[]);

// 영화정보 가져오기
    const fetchData = async () => {
      //현재 상영중(fetchNowPlaying)인 영화정보를 가져오기 (20개)
      const request = await axios.get(requests.fetchNowPlaying);
      //console.log(request);

      //20개 영화중 랜덤으로 영화정보(영화ID) 가져오기
      const movieId = request.data.results[
        Math.floor(Math.random() * request.data.results.length + 0)
      ].id;//Math.random - 랜덤으로 하나 고르는 함수/ Math.floor - 소수점 절삭

      //console.log(Math.floor(Math.random() * request.data.results.length + 0));
      //console.log(movieId);
      //{data:movieDetail}구조분해할당속성 이용해서 data안에 있는 속성을 무비디테일에 저장
      //특정영화의 더 상세한 정보를 가져오기(videos 비디오 정보도 포함)
      const {data:movieDetail} = await axios.get(`movie/${movieId}`,{
        params:{append_to_response:"videos"}//append_to_response 요청한 데이터중에 값에 해당되는 데이터를 가져옴
        });
        //console.log(movieDetail);
        setMovie(movieDetail);
    }

    //영화설명
    const truncate = (str, n) => {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
    //str(overview값)에 값이 있어야함 100보다 클경우 substr메소드 사용해서 글자99개축출하여 반환하며 미만일경우 다시 리턴
    //substr(0, n - 1) index 0~ 99개 글자 추출 n(100으로지정해줬음)
  if(!isClicked){  
    return (//구조 - <https://image.tmdb.org/t/p - 기본주소><original -이미지 사이즈/이미지이름>
    <header className="banner"
      style={{
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}>

      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner__buttons">
          <button className='banner__button play'
            onClick={() => setIsClicked(true)}>Play</button>
          <button className='banner__button info'>More Information</button>
        </div>
        <p className='banner__description'>
          {truncate(movie.overview, 100)}
        </p>
      </div>
      <div className='banner--fadeBottom'>

      </div>
    </header>
  )
    }else{
      return(
        <Container>
          <HomeContainer>
            <Iframe src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            width="640" height="360" frameborder="0" allow="autoplay; fullscreen" 
            title="YouTube video player" allowfullScreen
            ></Iframe>
          </HomeContainer>
        </Container>
      )
    }
}
const Container = styled.div`
  display : flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width:100%
  height: 100%
`;
const Iframe = styled.iframe`
  width:100%
  height: 100%
  z-index: -1;
  opacity: 0.65;
  border: none;
  &::after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width:100%
    height: 100%
  }
`;
//Styled Component - css-in-js라고 하는 js파일 안에서 css를 처리할 수 있게 해주는 라이브러리임.
//Styled Component 클래스이름을 지정해주지 않아도 자동으로 생성
//import해준후 컴포넌트(Container,HomeContainer이름은 마음대로)처럼 만들어준다. 형태는 div 엘리먼트임const Container = styled.div`css형태 적용`;
export default Banner