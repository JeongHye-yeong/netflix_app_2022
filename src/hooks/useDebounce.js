//성능 개선을 위한 hook함수 직접 만듦
import React, { useEffect, useState } from 'react';

//useDebounce hook함수의 사용 - 검색창에 입력(=searchTurm)을 할때 작동되는 hook함수로,
//                             글자를 멈추지 않고 계속 입력하면 searchTurm값을 받아오려한다 
//                              성능개선을 위한 훅함수     
//hook 함수는 만들어서도 사용이 가능하다 이름 지정시 use....로 해야된다
//value - 키보드로 입력하는 글자가 들어온다. / delay - 입력하다 멈추는 구간
export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    //value와 delay 값이 바뀔때마다 useEffect함수 실행
    //setTimeout 일정한 시간(0.5초로 설정)이 지나고 나면 setTimeout을 한번만 실행시켜줌
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);            
        }, delay);

        //0.5초가 되지 않았는데 글자가 입력되면 return이 실행되며 setTimeout이 실행됨
        // segDebounceValue(value); 실행되지 않을때 return의 clearTimeout(handler);이 실행됨
        return () => {
            clearTimeout(handler);
        }

    },[value,delay]);

    return debounceValue;
}