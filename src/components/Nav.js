import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Nav.css';

function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();//바로 주소창에 입력해서 이동하게끔 새로고침해서 홈페이지로 갈 수 있게함

  useEffect(() => {//component didmount
    window.addEventListener("scroll", () => {
        //console.log("window.scrolly", window.scrollY);//"window.scrolly"콘솔창에 문자나오고, window.scrollY 뒤에 값이나옴
        if(window.scrollY > 50) {
            setShow(true);
        }else{
            setShow(false);
        }
    });
    return () => {//해당 컴포넌트가 사용되지않을떄에는 이벤트를 삭제해줘야하는데 그 기능을 return이 함 
      window.removeEventListener("scroll", () => {});
    };
  },[]);//useEffect(()=>{},[])기본모양 []비어있으면 컴포넌트가 처음 마운트 되면 실행함 
  
  //검색창 
  //navigate(`/search?q=<기본주소값>${e.target.value}`); 검색창에 입력한 e.target.value입력하면 주소가 e.target.value값으로 바뀜
  const onChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  return (
    <nav className={`nav ${show && "nav__black"}`}> 
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png' 
            alt='Netflix logo'
            className='nav__logo'
            onClick={() => (window.location.href="/netflix_app_2022/")} />
            {/* onClick={() => (window.location.href="/netflix_app_2022/(깃허브리파지토리네임)" 로고 클릭시 새로고침- 홈페이지로 돌아가는 법 */}
        <input type="search" value={searchValue} onChange={onChange} 
          placeholder="영화를 검색해주세요" className="nav__input" />
        <img 
            src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41' 
            alt='User logged'
            className='nav__avatar'/>
    </nav>
  )
}
//{`nav`} 스크롤이 내려가면 배경이 바뀌므로 조건을 넣어주려함
//onClick={() => window.location.reload() 클릭하면 새로고침이 된다.
export default Nav