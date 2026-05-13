// PackingList.jsx

import Items from "./Items";

// [이 코드는 이럴 때 쓰는 거다]
// 가장 기본적인 부모-자식 + 조건부 렌더링 문제
// 예: "여행 준비 목록을 만들고, Items 컴포넌트에 props를 전달하시오"

// export default function PackingList() {
//   return (
//     <section>
//       <h1>여행 준비 목록</h1>

//       <ul>
//         {/* [부모가 자식에게 props 전달] */}
//         <Items name="여분 옷" isPacked={true} />
//         <Items name="세면도구" isPacked={false} />
//         <Items name="노트북" isPacked={true} />
//       </ul>
//     </section>
//   );
// }

// App.jsx
//   ↓
// PackingList.jsx
//   ↓
// Items.jsx

export default function PackingList() {
  return (
    <section>
      <h1>여행 준비 목록</h1>

      <ul>
        {/* [부모가 자식에게 props 전달] */}
        <Items name="리액트 공부" isPacked={true} />
        <Items name="운동" isPacked={false} />
        <Items name="과제 제출" isPacked={true} />
      </ul>
    </section>
  );
}