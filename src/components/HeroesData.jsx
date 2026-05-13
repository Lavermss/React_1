// HeroesData.jsx

// [이 코드는 이럴 때 쓰는 거다]
// 배열 데이터를 따로 분리해 export 하는 문제
// 예: "heroes 배열을 별도 파일에 저장하시오"

export const heroes = [
  {
    id: 0,                 // [key prop에 쓰기 좋은 고유값]
    casting: "스파이더맨",
    name: "피터 파커",
  },
  {
    id: 1,
    casting: "아이언맨",
    name: "토니 스타크",
  },
  {
    id: 2,
    casting: "배트맨",
    name: "브루스 웨인",
  },
  {
    id: 3,
    casting: "슈퍼맨",
    name: "클라크 켄트",
  },
  {
    id: 4,
    casting: "헐크",
    name: "로버트 브루스 배너",
  },
];

// App.jsx
//   ↓
// MovieHeroes.jsx
//   ↓
// HeroesData.jsx