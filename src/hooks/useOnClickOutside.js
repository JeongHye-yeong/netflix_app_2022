import React, { useEffect } from 'react';

//ref 무비모달페이지의 div의 클래스네임 modal을 가르킴
function useOnClickOutside(ref, handler) {
  useEffect(() => {

    console.log('ref',ref);
    
    const listener = (event) => {
        //!ref.current : 모달창이 없을떄 또는 ref.current.contains(event.target) : 모달창의 이벤트 타겟을 포함되어 있으면 return실행 (안닫힘)
        //그렇지 않으면 handler(event); 로 창이 닫히게 됨 
        if (!ref.current || ref.current.contains(event.target)) {
            return;
        }
        handler(event);
    };
    //document에 이벤트리스너 포함 하는데 마우스눌렀을때와 화면터치시에도 실행이 된다.
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    
    return () => {//컴포넌트가 없어졌을 때(언마운트) 리스너들을 삭제해주는 역할 
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
    };

},[ref, handler])
}

export default useOnClickOutside