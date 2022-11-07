import axios from "axios";

const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3",
    params: {
        api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
        language: "ko-KR",//en-US
    },
})
//https://api.themoviedb.org/3/<폴더이름 : movie>/{movieId}?<여기부터가 params임 - api_key=내api키&language=en-US&page=1>
export default instance;