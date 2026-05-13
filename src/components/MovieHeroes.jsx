import {heroes} from "./HeroesData";

export default function MovieHeroes(){
    const filterTests = heroes.filter(hero =>
        hero.power === 5
    );
    const listHeroes = filterTests.map (hero =>
        <li key={hero.id}>
            <p>
                {hero.name}의 배역은 {hero.casting}입니다
            </p>
        </li>
    );

    return (
        <section>
            <h1>영화 속 영웅들</h1>
            <ul>
                {listHeroes}
            </ul>
        </section>
    );
}


// MovieHeroes.jsx

import { heroes } from "./HeroesData";

// [이 코드는 이럴 때 쓰는 거다]
// 배열 + filter + map + key 문제에 사용
// 예: "클라크 켄트 데이터만 추출하여 출력하시오"
// 예: "heroes 배열을 리스트로 렌더링하시오"

export default function MovieHeroes() {
  // [1단계] 조건에 맞는 데이터만 뽑기
  const filterTests = heroes.filter((hero) => hero.name === "클라크 켄트");

  // [2단계] 뽑은 배열을 JSX로 바꾸기
  const listHeroes = filterTests.map((hero) => (
    <li key={hero.id}>
      {/* [map 안의 JSX에는 key 필수] */}
      <p>
        {hero.name}의 배역은 {hero.casting}입니다.
      </p>
    </li>
  ));

  // [3단계] 화면에 출력
  return (
    <section>
      <h1>영화 속 영웅들</h1>
      <ul>{listHeroes}</ul>
    </section>
  );
}


// App.jsx
//   ↓
// MovieHeroes.jsx
//   ↓
// HeroesData.jsx