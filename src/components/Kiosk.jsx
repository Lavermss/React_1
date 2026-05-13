// Kiosk.jsx

import OrderUp from "./OrderUp";

// [이 코드는 이럴 때 쓰는 거다]
// 부모가 같은 자식 컴포넌트를 다른 props 값으로 여러 번 호출하는 문제
// 예: "일반세트는 1, 패밀리세트는 2를 전달하시오"

export default function Kiosk() {
  return (
    <section>
      <h2>치즈버거 세트 메뉴를 주문하세요.</h2>

      {/* <p>일반 세트 :</p> */}
      {/* [order props로 1 전달] */}
      <OrderUp order={1} />

      {/* <p>패밀리 세트 :</p> */}
      {/* [order props로 2 전달] */}
      <OrderUp order={2} />

      <p>이용해 주셔서 감사합니다.</p>
    </section>
  );
}


// App.jsx
//   ↓
// Kiosk.jsx
//   ↓
// OrderUp.jsx