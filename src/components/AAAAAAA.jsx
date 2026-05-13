// 13. 시험장에서 문제 바뀌어도 푸는 사고 순서

// 문제를 보면 바로 아래 순서로 해라.

// A. 컴포넌트 만드는 문제
// export default function Test() {
//   return (
//     <section>
//       <h1>제목</h1>
//     </section>
//   );
// }


// B. props 받는 문제
// function Child({ name }) {
//   return <p>{name}</p>;
// }


// C. 조건문 문제
// function Item({ name, done }) {
//   return <li>{done ? `${name} 완료` : name}</li>;
// }


// D. 배열 출력 문제
// const data = [
//   { id: 1, name: "A" },
//   { id: 2, name: "B" },
// ];

// return (
//   <ul>
//     {data.map((item) => (
//       <li key={item.id}>{item.name}</li>
//     ))}
//   </ul>
// );


// E. filter 문제
// const result = data.filter((item) => item.name === "A");


// 14. 가장 자주 나오는 실수

// 1. export default 빼먹음
// export default function Test() { ... }

// 2. import 경로 틀림
// import Items from "./Items";

// 3. map 안에서 key 안 줌
// <li key={item.id}>{item.name}</li>

// 4. 화살표 함수에 return 안 씀
// arr.map((item) => {
//   return <li key={item.id}>{item.name}</li>;
// });

// 5. JSX 밖에서 태그 씀

// 반드시 return ( ... ) 안에 써야 한다.

// 6. prop 이름 불일치

// 부모:

// <Items name="노트북" />

// 자식:

// function Items({ name }) { ... }