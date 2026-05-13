// Items.jsx

// [이 코드는 이럴 때 쓰는 거다]
// 조건부 렌더링 문제에서 가장 많이 쓰는 파일
// 예: "완료된 항목이면 체크표시", "isPacked가 true면 취소선 표시"

// [버전 1] if문 버전
/*
export default function Items({ name, isPacked }) {
  if (isPacked) {
    return <li>{name} ✅</li>; // [참일 때]
  }
  return <li>{name}</li>; // [거짓일 때]
}
*/

// [버전 2] 삼항연산자 버전
/*
export default function Items({ name, isPacked }) {
  return <li>{isPacked ? `${name} ✅` : name}</li>;
}
*/

// [버전 3] del 태그 버전 - 교수님 슬라이드형
// export default function Items({ name, isPacked }) {
//   return (
//     <li>
//       {/* [이 문제 나오면 이거 쓰면 된다]
//           true면 <del>태그까지 포함해서 출력 */}
//       {isPacked ? <del>{name} ✅</del> : name}
//     </li>
//   );
// }

// App.jsx
//   ↓
// PackingList.jsx
//   ↓
// Items.jsx

export default function Items({ name, isPacked }) {
  return <li>{isPacked ? `${name} ✅` : name}</li>;
}