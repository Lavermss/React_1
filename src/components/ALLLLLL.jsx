// 1. App.jsx

// 가장 먼저 열어서 어떤 컴포넌트를 띄울지 바꾸는 파일이다.

// // App.jsx

// // 시험에서 필요한 컴포넌트만 import 해서 사용하면 됨
// import PackingList from "./components/PackingList";
// // import MovieHeroes from "./components/MovieHeroes";
// // import Kiosk from "./components/Kiosk";
// // import SpreadComp from "./components/SpreadComp";
// // import ParentComp from "./components/ParentComp";
// // import Gallery from "./components/Gallery";
// // import TeaSet from "./components/TeaSet";
// // import UseJsx from "./components/UseJsx";
// // import NamedComponentTest from "./components/NamedComponentTest";

// export default function App() {
//   // 여기서 보여줄 컴포넌트만 바꾸면 됨
//   return <PackingList />;
// }
// 2. JSX 기본

// JSX 안에서 변수와 함수 쓰는 기본형이다.

// UseJsx.jsx
// export default function UseJsx() {
//   const name = "React";

//   function formatDate(date) {
//     return new Intl.DateTimeFormat("en-US", {
//       weekday: "long",
//     }).format(date);
//   }

//   return (
//     <>
//       <h1>Hello, {name}</h1>
//       <p>Today is {formatDate(new Date())}</p>
//     </>
//   );
// }
// 이 파일로 기억할 것
// JS 값 출력: {name}
// 함수 결과 출력: {formatDate(new Date())}
// JSX는 반드시 하나의 부모로 감싸기: <> </>
// 3. 컴포넌트 기본 분리
// MyTitle.jsx
// export default function MyTitle() {
//   return <h1>My Gallery</h1>;
// }
// Profile.jsx
// import reactLogo from "../assets/react.svg";

// export default function Profile() {
//   return <img src={reactLogo} alt="React Logo" width="120" />;
// }
// Gallery.jsx
// import MyTitle from "./MyTitle";
// import Profile from "./Profile";

// export default function Gallery() {
//   return (
//     <>
//       <MyTitle />
//       <Profile />
//       <Profile />
//       <Profile />
//     </>
//   );
// }
// 이 파일들로 기억할 것
// 컴포넌트는 PascalCase
// 같은 컴포넌트 여러 번 호출 가능
// 부모 컴포넌트가 자식 컴포넌트를 포함함
// 4. props 전달 기본형
// ChildComp.jsx
// // 부모로부터 imageInfo, width, height를 전달받음
// export default function ChildComp({
//   imageInfo,
//   width = 300,   // 기본값
//   height = 300,  // 기본값
// }) {
//   return (
//     <img
//       src={imageInfo.src}
//       alt={imageInfo.alt}
//       width={width}
//       height={height}
//     />
//   );
// }
// ParentComp.jsx
// import ChildComp from "./ChildComp";
// import reactLogo from "../assets/react.svg";
// import viteLogo from "../assets/vite.svg";

// export default function ParentComp() {
//   return (
//     <>
//       {/* 기본 크기 사용 */}
//       <ChildComp
//         imageInfo={{
//           src: reactLogo,
//           alt: "React",
//         }}
//       />

//       {/* 크기 직접 전달 */}
//       <ChildComp
//         imageInfo={{
//           src: reactLogo,
//           alt: "React Small",
//         }}
//         width={100}
//         height={100}
//       />

//       {/* 다른 이미지 전달 */}
//       <ChildComp
//         imageInfo={{
//           src: viteLogo,
//           alt: "Vite",
//         }}
//         width={200}
//         height={200}
//       />
//     </>
//   );
// }
// 이 파일들로 기억할 것
// 부모 → 자식 데이터 전달
// 객체 형태 prop 전달 가능
// 기본값 설정 가능
// 구조분해 할당 사용 가능
// 5. spread 문법 / 객체 props 전달
// NameCard.jsx
// export default function NameCard({ id, name, age, job, location }) {
//   return (
//     <div>
//       <h2>사용자 정보</h2>
//       <p>ID: {id}</p>
//       <p>이름: {name}</p>
//       <p>나이: {age}</p>
//       <p>직업: {job}</p>
//       <p>거주지: {location}</p>
//     </div>
//   );
// }
// SpreadComp.jsx
// import NameCard from "./NameCard";

// export default function SpreadComp() {
//   const userData = {
//     id: 1,
//     name: "Tom",
//     age: 25,
//     job: "developer",
//     location: "seoul",
//   };

//   return (
//     <>
//       {/* 객체의 속성을 한 번에 props로 전달 */}
//       <NameCard {...userData} />
//     </>
//   );
// }
// 이 파일들로 기억할 것
// props.xxx 대신 구조분해로 바로 받기 가능
// ...객체명 으로 여러 props 한 번에 전달 가능
// 6. 조건부 렌더링 핵심

// 이건 시험에서 가장 중요하다.

// Items.jsx
// export default function Items({ name, isPacked }) {
//   // 1) if문 버전
//   /*
//   if (isPacked) {
//     return <li>{name} ✅</li>;
//   }
//   return <li>{name}</li>;
//   */

//   // 2) 삼항연산자 버전
//   return <li>{isPacked ? `${name} ✅` : name}</li>;

//   // 3) del 태그 사용 버전 (교수님 슬라이드형)
//   /*
//   return (
//     <li>
//       {isPacked ? <del>{name} ✅</del> : name}
//     </li>
//   );
//   */
// }
// PackingList.jsx
// import Items from "./Items";

// export default function PackingList() {
//   return (
//     <section>
//       <h1>여행 준비 목록</h1>
//       <ul>
//         <Items name="여분 옷" isPacked={true} />
//         <Items name="세면도구" isPacked={false} />
//         <Items name="노트북" isPacked={true} />
//       </ul>
//     </section>
//   );
// }
// 이 파일들로 기억할 것
// if
// ? :
// &&
// prop으로 받은 값에 따라 JSX 결과가 달라짐
// 7. 배열 데이터 / filter / map / key

// 이것도 시험 핵심이다.

// HeroesData.jsx
// // heroes 배열을 export
// export const heroes = [
//   {
//     id: 0,
//     casting: "스파이더맨",
//     name: "피터 파커",
//   },
//   {
//     id: 1,
//     casting: "아이언맨",
//     name: "토니 스타크",
//   },
//   {
//     id: 2,
//     casting: "배트맨",
//     name: "브루스 웨인",
//   },
//   {
//     id: 3,
//     casting: "슈퍼맨",
//     name: "클라크 켄트",
//   },
//   {
//     id: 4,
//     casting: "헐크",
//     name: "로버트 브루스 배너",
//   },
// ];
// MovieHeroes.jsx
// import { heroes } from "./HeroesData";

// export default function MovieHeroes() {
//   // 조건에 맞는 데이터만 추출
//   const filterTests = heroes.filter((hero) => hero.name === "클라크 켄트");

//   // 추출한 배열을 JSX로 변환
//   const listHeroes = filterTests.map((hero) => (
//     <li key={hero.id}>
//       <p>
//         {hero.name}의 배역은 {hero.casting}입니다.
//       </p>
//     </li>
//   ));

//   return (
//     <section>
//       <h1>영화 속 영웅들</h1>
//       <ul>{listHeroes}</ul>
//     </section>
//   );
// }
// 시험용 자주 나오는 다른 형태
// import { heroes } from "./HeroesData";

// export default function MovieHeroes() {
//   return (
//     <section>
//       <h1>영화 속 영웅들</h1>
//       <ul>
//         {heroes.map((hero) => (
//           <li key={hero.id}>
//             {hero.casting}: {hero.name}
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }
// 이 파일들로 기억할 것
// filter() : 조건에 맞는 데이터만 추출
// map() : JSX로 변환
// key : 리스트 렌더링 시 필수
// key는 고유값 id 사용
// 8. 화살표 함수 return 차이

// 이건 틀리기 쉬워서 따로 외워라.

// // 중괄호 없으면 return 생략 가능
// const list1 = [1, 2, 3].map((item) => <li key={item}>{item}</li>);

// // 중괄호 있으면 return 반드시 필요
// const list2 = [1, 2, 3].map((item) => {
//   return <li key={item}>{item}</li>;
// });
// 시험장에서 기억법
// => ( ) 또는 => <태그> : return 생략 가능
// => { } : return 써야 함
// 9. props 활용 계산 문제

// 키오스크 문제형이다.

// OrderUp.jsx
// export default function OrderUp({ order }) {
//   return (
//     <section>
//       <p>
//         치즈버거 {order}개 / 콜라 {order}개 + (이벤트) 프렌치 프라이 {2 * order}개
//       </p>
//     </section>
//   );
// }
// Kiosk.jsx
// import OrderUp from "./OrderUp";

// export default function Kiosk() {
//   return (
//     <section>
//       <h2>치즈버거 세트 메뉴를 주문하세요.</h2>

//       <p>일반 세트 :</p>
//       <OrderUp order={1} />

//       <p>패밀리 세트 :</p>
//       <OrderUp order={2} />

//       <p>이용해 주셔서 감사합니다.</p>
//     </section>
//   );
// }
// 이 파일들로 기억할 것
// prop 값으로 계산 가능
// {2 * order} 같은 산술 연산 가능
// 같은 컴포넌트를 다른 값으로 여러 번 호출 가능
// 10. 순수 함수 / side effect 금지

// 7주차에서 매우 중요하게 본 내용이다.

// TeaSet.jsx
// // 잘못된 예시와 올바른 예시를 같이 적어둠

// /*
// ❌ 잘못된 방식
// 컴포넌트 바깥 변수를 직접 바꾸면 예측이 어려워짐
// let guest = 0;

// function Cup() {
//   guest = guest + 1;
//   return <h2>Tea cup for guest #{guest}</h2>;
// }
// */

// function Cup({ guest }) {
//   // ✅ props로 전달된 값을 사용
//   return <h2>Tea cup for guest #{guest}</h2>;
// }

// export default function TeaSet() {
//   return (
//     <>
//       <Cup guest={1} />
//       <Cup guest={2} />
//       <Cup guest={3} />
//     </>
//   );
// }
// 이 파일로 기억할 것
// 외부 변수 직접 변경하지 말 것
// 컴포넌트는 순수하게 props 기반으로 동작
// 결과가 예측 가능해야 함
// 11. named export / default export
// NamedComponent.jsx
// export function NamedComponent1() {
//   return <h1>Named Component1</h1>;
// }

// export function NamedComponent2() {
//   return <h1>Named Component2</h1>;
// }

// export function NamedComponent3() {
//   return <h1>Named Component3</h1>;
// }
// NamedComponentTest.jsx
// import * as Foo from "./NamedComponent";

// export default function NamedComponentTest() {
//   return (
//     <>
//       <h1>Named Component Test</h1>
//       <Foo.NamedComponent1 />
//       <Foo.NamedComponent2 />
//       <Foo.NamedComponent3 />
//     </>
//   );
// }
// 이 파일들로 기억할 것
// default export : 파일당 1개
// named export : 여러 개 가능
// import * as Foo from ... 가능
// 12. 시험용 통합 메모

// 아래는 네가 VSCode에 시험메모.txt 같은 파일로 저장해도 좋다.

// [React 실기시험 빠른 풀이 순서]

// 1. App.jsx에서 컴포넌트 연결
//    return <PackingList />;

// 2. 기본 컴포넌트 틀
//    export default function 컴포넌트명() {
//      return ( ... );
//    }

// 3. props 받기
//    function Items({ name, isPacked }) { ... }

// 4. 조건부 렌더링
//    if (isPacked) { return <li>{name} ✅</li>; }
//    return <li>{name}</li>;

//    또는
//    return <li>{isPacked ? `${name} ✅` : name}</li>;

// 5. 배열 렌더링
//    const list = arr.map((item) => (
//      <li key={item.id}>{item.name}</li>
//    ));

// 6. filter + map
//    const result = heroes
//      .filter((hero) => hero.name === "클라크 켄트")
//      .map((hero) => (
//        <li key={hero.id}>{hero.name}</li>
//      ));

// 7. key 필수
//    key={item.id}

// 8. spread 문법
//    <NameCard {...userData} />

// 9. 중괄호 있는 화살표 함수는 return 필요
//    arr.map((item) => {
//      return <li>{item}</li>;
//    });

// 10. side effect 금지
//    외부 변수 직접 변경 X
//    props로 값 전달 O
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
// 15. 시험 직전 추천 App.jsx 교체용 목록
// PackingList 확인용
// import PackingList from "./components/PackingList";

// export default function App() {
//   return <PackingList />;
// }
// MovieHeroes 확인용
// import MovieHeroes from "./components/MovieHeroes";

// export default function App() {
//   return <MovieHeroes />;
// }
// Kiosk 확인용
// import Kiosk from "./components/Kiosk";

// export default function App() {
//   return <Kiosk />;
// }
// SpreadComp 확인용
// import SpreadComp from "./components/SpreadComp";

// export default function App() {
//   return <SpreadComp />;
// }
// ParentComp 확인용
// import ParentComp from "./components/ParentComp";

// export default function App() {
//   return <ParentComp />;
// }
// 16. 결론

// 지금 수업 범위 기준으로 실기시험 핵심은 사실상 이 6개다.

// 컴포넌트 만들기
// import / export
// props 전달
// 조건부 렌더링
// 배열 map, filter
// key, 순수 함수 구조