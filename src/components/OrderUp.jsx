// OrderUp.jsx

// [이 코드는 이럴 때 쓰는 거다]
// props로 숫자를 받아 계산해서 출력하는 문제
// 예: "order가 2면 햄버거 2개, 감자튀김 4개 출력하시오"

export default function OrderUp({ order }) {
  return (
    <section>
      <p>
        {/* [props 값 그대로 출력] */}
        치즈버거 {order}개

        {/* [props 값으로 계산 가능] */}
        / 콜라 {order}개 + (이벤트) 프렌치 프라이 {2 * order}개
      </p>
    </section>
  );
}

// App.jsx
//   ↓
// Kiosk.jsx
//   ↓
// OrderUp.jsx

// export default function OrderUp({ order }) {
//   return (
//     <section>
//       <p>
//         {/* [props 값 그대로 출력] */}
//         커피 {order}개
        

//         {/* [props 값으로 계산 가능] */}
//         / 물 {order}개 

//         /쿠키 {2 * order}개
//       </p>
//     </section>
//   );
// }