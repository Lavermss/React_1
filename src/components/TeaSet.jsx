// TeaSet.jsx

// [이 코드는 이럴 때 쓰는 거다]
// side effect 금지, 순수 함수 구조 문제에 사용
// 예: "외부 변수를 직접 변경하지 않도록 수정하시오"

/*
❌ 잘못된 방식
let guest = 0;

function Cup() {
  guest = guest + 1; // [컴포넌트 바깥 변수를 직접 바꾸면 안 됨]
  return <h2>Tea cup for guest #{guest}</h2>;
}
*/

// ✅ 올바른 방식
function Cup({ guest }) {
  // [필요한 값은 props로 받아서 출력]
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      {/* [이 문제 나오면 이거 쓰면 된다]
          바깥 변수 변경 없이 props로 각각 전달 */}
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}


// App.jsx
//   ↓
// TeaSet.jsx
//   ↓
// Cup (내부함수)