import { Outlet, Route, Routes } from 'react-router-dom';
import requests from './api/requests';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Row from './components/Row';
import DetailPage from './routes/DetailPage';
import MainPage from './routes/MainPage';
import SearchPage from './routes/SearchPage';
import './styles/App.css';

//Layout이라는 함수형 컴포넌트 사용 -outlet 중첩 라이팅을 사용함
//outlet - outlet 컴포넌트안에 MainPage,DetailPage,SearchPage이 들어가 있음
//리액트 라우터 돔에서 Outlet(중첩에 해당) 리액트 라우터 돔에 함수형 컴포넌트가 추가됨
const Layout = () => {
  return(
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}
            
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>  
      </Routes>
      {/* <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} 
      isLargeRow />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Animation Movie" id="AN" fetchUrl={requests.fetchAnimationMovies}/>
      <Row title="Family Movie" id="FM" fetchUrl={requests.fetchFamilyMovies}/>
      <Row title="Adventure Movie" id="DM" fetchUrl={requests.fetchAdventureMovies} />
      <Row title="Science Fiction Movie" id="SM" fetchUrl={requests.fetchScienceFictionMovies} />
      <Row title="Action Movie" id="CM" fetchUrl={requests.fetchAction} />
      <Footer /> */}
      {/* <Route path="/" element={<Layout />}> 부모주소로 나머지는 자식주소로 부모주소에 자식주소가 붙어서 중첩라우팅이며 중첩라우팅 사용하려면 outlet함수를 사용해줘야 함
          <Route path=":movieId" element={<DetailPage />} /> - :movieId - localhost:3000/Movie의 Id값(param값임)이 붙는다
          <Route path="search" element={<SearchPage />} /> - localhost:3000/search 일반경로로 /search,search /는 없어도 상관없음
          <Route index element={<MainPage />} /> - index 홈페이지로 localhost:3000/이 인덱스에 해당
          Layout을 App컴포넌트처럼 만들어줌 */}
    </div>
  );
}

export default App;
