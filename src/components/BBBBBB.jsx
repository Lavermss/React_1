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