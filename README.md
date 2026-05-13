<h1 align="center">202130402 김민수</h1>
---
---

## 📅 10주차 (5월 14일)
# 10주차 학습 기록: 이벤트 전파와 State 기초

---

## 1. children props 활용

컴포넌트 태그 사이의 내용을 `children` props로 전달받아 사용하는 방법을 학습하였다.

- `<Button>내용</Button>` 형태 사용
- 태그 내부 내용이 자동으로 children에 전달됨
- 문자열뿐 아니라 JSX도 전달 가능

```jsx
<Button message="클릭 이벤트">
  버튼 클릭
</Button>
```

---

## 2. 이벤트 핸들러 전달

이벤트 함수를 props 형태로 전달하여 버튼마다 다른 동작을 수행하도록 구성하였다.

- 이벤트 함수도 props로 전달 가능
- 부모 컴포넌트에서 이벤트 로직 관리 가능
- 컴포넌트 재사용성 향상

```jsx
<Button onClick={() => alert("버튼1 클릭!")}>
  버튼1
</Button>
```

---

## 3. 이벤트 전파(Event Bubbling)

하위 요소에서 발생한 이벤트가 부모 요소까지 전달되는 구조를 학습하였다.

```jsx
<nav onClick={() => alert("네비게이션바 클릭!")}>
```

- 버튼 클릭 시 부모 이벤트도 함께 실행됨
- DOM 트리 기반 이벤트 전달 구조 이해
- React에서도 기본적으로 이벤트 전파 발생

---

## 4. 이벤트 전파 중지

`stopPropagation()`을 사용하여 이벤트 전파를 중지하는 방법을 학습하였다.

```jsx
<button
  onClick={(e) => {
    e.stopPropagation();
    onClick();
  }}
>
```

- 부모 이벤트 실행 방지 가능
- 독립적인 이벤트 처리 가능
- 이벤트 객체(event)를 활용하여 제어

---

## 5. preventDefault()

브라우저의 기본 동작을 방지하는 방법을 학습하였다.

```jsx
e.preventDefault();
```

- form 제출 시 새로고침 방지
- 사용자 정의 이벤트 처리 가능
- 브라우저 기본 기능 제어 가능

---

## 6. CSS Module 활용

CSS Module을 사용하여 컴포넌트 단위로 스타일을 관리하는 방법을 학습하였다.

- 스타일 충돌 방지 가능
- 지역 스코프(local scope) 기반 적용
- 유지보수 효율 증가

```jsx
import style from "./Bubble.module.css";

<h1 className={style.title}>Bubble</h1>
```

---

## 7. CSS Module 네이밍 규칙

- 파일명은 `.module.css` 사용
- React에서는 camelCase 방식 권장
- class 선택자 기반 스타일 작성

```css
.navBar {
  padding: 10px;
}
```

---

## 8. video 태그와 DOM 접근

JSX에서 `<video />` 태그를 사용하는 방법을 학습하였다.

```jsx
<video src="movie.mp4" />
```

- JSX에서는 self-closing 태그 사용 가능
- React에서는 DOM 직접 접근을 권장하지 않음
- 이후 useRef Hook 기반 관리 예정

---

## 9. State 개념 이해

React에서 state는 컴포넌트가 기억해야 하는 데이터라는 점을 학습하였다.

예시:
- 입력값 저장
- 이미지 변경
- 장바구니 데이터 관리

- 사용자 상호작용 결과를 저장하는 역할
- 화면 업데이트와 연결됨

---

## 10. 로컬 변수 기반 상태 저장

로컬 변수로 index 값을 저장하여 캐러셀 구조를 구현하였다.

```jsx
let index = 0;
```

- 버튼 클릭 시 index 값 변경
- 슬라이드 형태 UI 구성 가능
- 상태 저장 구조의 필요성 이해

---

## 11. 이미지 관리 구조

여러 이미지를 사용할 때 import 코드가 복잡해지는 문제를 해결하기 위한 구조를 학습하였다.

```jsx
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg";
```

- 이미지 모듈화 가능
- import 코드 정리 가능
- assets 디렉토리 구조 관리 중요

---

## 핵심 정리

- children props로 태그 내부 내용 전달 가능
- 이벤트 함수도 props 형태로 전달 가능
- stopPropagation()으로 이벤트 전파 중지 가능
- preventDefault()로 브라우저 기본 동작 방지 가능
- CSS Module을 활용하여 스타일 충돌 방지 가능
- state는 컴포넌트가 기억해야 하는 값이다

---

## 한줄 정리

이벤트 전파 구조와 CSS Module 활용 방식, 그리고 React의 State 개념 및 이벤트 제어 방식을 학습하였다.

---

## 📅 9주차 (5월 6일)
# 9주차 학습 기록: children props와 이벤트 핸들러 전달

---

## 1. children props 이해

컴포넌트 태그 사이의 내용을 `children` props로 전달받는 방법을 학습하였다.

- `<Button>내용</Button>` 형태 사용
- 태그 사이 내용이 자동으로 children에 전달됨

```jsx
export default function Button({ message, children }) {

  function handleClick() {
    alert(message);
  }

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}
```

---

## 2. children props 특징

children props는 컴포넌트 내부에 직접 정의하지 않아도 자동으로 전달된다.

```jsx
<Button message="저장 완료">
  버튼 클릭
</Button>
```

- 태그 사이 문자열 또는 JSX 전달 가능
- 재사용성이 높아짐

---

## 3. 이벤트 핸들러 전달

이벤트 핸들러를 props 형태로 전달하는 구조를 학습하였다.

- 버튼마다 다른 기능 수행 가능
- 컴포넌트 재사용에 유리

```jsx
<button onClick={() => alert('clicked')}>
  Click
</button>
```

---

## 4. 이벤트 처리 구조

- Button 컴포넌트 → 출력 담당
- 이벤트 함수 → 별도 관리
- 부모 컴포넌트에서 이벤트 전달 가능

---

## 5. 이벤트 핸들러 사용 시 주의점

이벤트 함수를 직접 호출하면 렌더링 시 즉시 실행된다.

```jsx
// 잘못된 방식
<button onClick={alert('click')}>
```

```jsx
// 올바른 방식
<button onClick={() => alert('click')}>
```

---

## 핵심 정리

- children props는 태그 사이 내용을 전달한다
- 이벤트 핸들러는 함수 형태로 전달해야 한다
- props 기반 이벤트 전달 구조가 중요하다
- 컴포넌트 역할 분리가 유지보수에 유리하다

---

## 한줄 정리

children props와 이벤트 핸들러 전달 방식을 활용하여 재사용 가능한 컴포넌트 구조를 학습하였다.

---
---

## 📅 8주차 (4월 29일)
# 8주차 학습 기록: CSS 적용 방법 및 이벤트 처리

---

## 1. 일반 CSS 적용

가장 기본적인 방식으로 CSS 파일을 생성한 후 컴포넌트에서 import하여 사용하는 방법을 학습하였다.

- HTML과 동일하게 CSS 적용
- JSX에서는 `class` 대신 `className` 사용
- 전역 스타일이므로 충돌 가능성 존재

```css
/* styles.css */
.button {
  background: blue;
  color: white;
}
```

```jsx
import './styles.css';

function Button() {
  return <button className="button">Click</button>;
}
```

---

## 2. 인라인 스타일

JSX 내부에서 직접 스타일을 적용하는 방법을 학습하였다.

- 객체 형태로 스타일 작성
- 속성은 camelCase 사용
- 유지보수 어려움으로 제한적으로 사용

```jsx
function Button() {
  return (
    <button style={{ backgroundColor: 'blue', color: 'white' }}>
      Click
    </button>
  );
}
```

---

## 3. 이벤트 핸들러

React에서 이벤트를 처리하는 방법을 학습하였다.

- JSX에서 이벤트 속성 사용 가능 (onClick 등)
- 이벤트는 함수 형태로 전달해야 함

```jsx
<button onClick={() => alert('You clicked me!')}>
  Click
</button>
```

### ■ 주의

```jsx
// 잘못된 방식 (렌더링 시 바로 실행됨)
<button onClick={alert('You clicked me!')}>
```

---

## 4. 이벤트 응답 구조

- 클릭, hover, 입력 등 사용자 동작에 반응
- JSX에서 직접 이벤트 핸들러 연결
- 사용자 정의 컴포넌트에서도 이벤트 전달 가능

---

## 5. CSS Module 사용

CSS 충돌 문제를 해결하기 위한 방식으로 CSS Module을 학습하였다.

- 파일명: `컴포넌트명.module.css`
- import 시 객체 형태로 사용
- 클래스 충돌 방지 (지역 스코프)

```css
/* ButtonCom.module.css */
.navBar {
  padding: 15px;
  background-color: #ccc;
}

.myButton {
  margin-right: 10px;
}
```

```jsx
import styles from './ButtonCom.module.css';

export default function ButtonCom() {
  return (
    <nav className={styles.navBar}>
      <button className={styles.myButton}>Click</button>
    </nav>
  );
}
```

---

## 6. 여러 클래스 적용 및 조건부 스타일

```jsx
<nav className={`${styles.navBar} ${styles.active}`}></nav>
```

```jsx
<nav className={`${styles.navBar} ${isActive ? styles.active : ''}`}></nav>
```

---

## 핵심 정리

- CSS 적용 방식: 일반 CSS / 인라인 / CSS Module
- JSX에서는 className 사용
- 인라인 스타일은 객체 형태로 작성
- 이벤트는 함수 형태로 전달해야 함
- CSS Module을 통해 스타일 충돌 방지 가능

---

## 한줄 정리

React에서 스타일 적용 방법과 이벤트 처리 방식, 그리고 CSS Module을 활용한 구조적인 스타일 관리 방법을 학습하였다.

---

## 📅 7주차 (4월 15일)
# 7주차 학습 기록: 리스트 렌더링과 컴포넌트 구조

## 1. 배열 데이터 렌더링

배열 데이터를 활용하여 화면에 리스트를 출력하는 방법을 학습하였다.

- `filter()`로 조건에 맞는 데이터 추출
- `map()`으로 JSX 변환

```jsx
const list = heroes
  .filter(hero => hero.name === "블랙 팬더")
  .map(hero => <li key={hero.id}>{hero.name}</li>);
```

---

## 2. 화살표 함수 사용

화살표 함수에서 `{}`를 사용할 경우 `return`이 필요하다는 점을 확인하였다.

```jsx
arr.map(item => <li>{item}</li>); // return 생략 가능

arr.map(item => {
  return <li>{item}</li>; // return 필요
});
```

---

## 3. key prop의 필요성

리스트 렌더링 시 각 요소에 `key`를 반드시 지정해야 한다.

- React가 요소를 구분하기 위한 기준
- 고유값(id 등)을 사용해야 함

---

## 4. Props를 활용한 동적 출력

props 값을 전달하여 컴포넌트 출력 결과를 변경하는 구조를 학습하였다.

```jsx
function OrderUp({ order }) {
  return <p>치즈버거 {order}개 / 프렌치프라이 {2 * order}개</p>;
}
```

---

## 5. 사이드 이펙트와 올바른 구조

컴포넌트 외부 변수를 직접 변경하면 문제가 발생함을 확인하였다.

```jsx
// 잘못된 방식
let guest = 0;
guest = guest + 1;
```

→ props를 통해 값을 전달하는 방식으로 수정

```jsx
function Cup({ guest }) {
  return <h2>{guest}</h2>;
}
```

---

## 핵심 정리

- 배열 데이터는 filter + map으로 렌더링
- map 사용 시 key 필수
- props로 컴포넌트 동작 제어
- 외부 상태 변경은 지양 (순수 함수 유지)

---

## 한줄 정리

데이터 기반 렌더링과 key, 그리고 props를 활용한 안정적인 컴포넌트 구조를 이해하였다.

---

## 📅 6주차 (4월 8일)
<h3>조건부 렌더링</h3>

컴포넌트는 조건에 따라 다른 항목을 표시해야 하는 경우가 많습니다. React는 if 문, && 및 ? : 연산자와 같은 자바스크립트 문법을 사용하여 조건부로 JSX를 렌더링할 수 있습니다.

### 학습 내용

- 조건에 따라 다른 JSX를 반환하는 방법
- JSX 조각을 조건부로 포함하거나 제외하는 방법
- React 코드에서 흔히 볼 수 있는 조건부 문법

---

### 조건부 렌더링 예시

```js
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}
```

```js
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}

return <li className="item">{name}</li>;
```

```js
let itemContent = name;

if (isPacked) {
  itemContent = name + " ✅";
}

<li className="item">
  {itemContent}
</li>
```

```js
{isPacked ? <A /> : <B />}
```

```js
{isPacked && <A />}
```

---

### 리스트 렌더링

```js
const heroes = [
  { id: 1, name: "스파이더맨", realName: "피터 파커" },
  { id: 2, name: "아이언맨", realName: "토니 스타크" },
  { id: 3, name: "배트맨", realName: "브루스 웨인" },
  { id: 4, name: "슈퍼맨", realName: "클라크 켄트" },
  { id: 5, name: "헐크", realName: "로버트 브루스 배너" }
];
```

```js
function HeroList() {
  return (
    <ul>
      {heroes.map((hero) => (
        <li key={hero.id}>
          {hero.name}: {hero.realName}
        </li>
      ))}
    </ul>
  );
}
```

---

### 요약

- 조건부 렌더링은 JS 문법 사용
- if / 삼항 / && 활용
- map()으로 리스트 렌더링
- key 필수

---

## 📅 5주차 (4월 1일)
# 5주차 학습 기록: Props와 Spread 문법

## 1. Props 전달 구조 이해

부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법을 학습하였다.  
특히 단순 값이 아닌 **객체 형태로 props를 전달**하고, 자식에서는 이를 구조 분해하여 사용하는 방식이 익숙해졌다.

- 부모 → 자식 단방향 데이터 흐름 이해
- 객체 형태 props 활용

---

## 2. Props 기본값 설정

props를 전달하지 않았을 경우를 대비해 **기본값을 설정하는 방법**을 배웠다.

- 값이 없을 때 자동 적용됨
- 컴포넌트 재사용 시 안정성 확보

---

## 3. 구조 분해 할당 활용

props를 `props.xxx` 형태로 사용하는 대신,  
**구조 분해를 통해 필요한 값만 바로 꺼내 사용하는 방식**을 적용하였다.

- 코드가 간결해짐
- 가독성 향상

---

## 4. Spread 문법 활용

객체 데이터를 컴포넌트에 전달할 때  
**Spread 문법(...)을 활용하면 여러 props를 한 번에 전달할 수 있음**을 확인하였다.

- 반복 코드 감소
- 데이터 전달이 훨씬 간결해짐

---

## 5. 컴포넌트 재사용

같은 컴포넌트를 여러 번 사용하면서  
props 값만 변경하여 다양한 결과를 출력할 수 있었다.

- 하나의 컴포넌트로 다양한 UI 구성 가능
- 유지보수 효율 증가

---

## 6. JSX에서 JavaScript 활용

JSX 내부에서 함수를 정의하고 호출하여  
동적인 값을 화면에 출력하는 방법을 학습하였다.

- `{}`를 활용한 JS 표현식 사용
- 함수 실행 결과를 바로 렌더링

---

## 핵심 정리

- Props는 부모 → 자식으로 전달된다
- 구조 분해를 활용하면 코드가 간결해진다
- Spread 문법은 여러 데이터를 한 번에 전달할 때 유용하다
- props 기반으로 컴포넌트를 재사용하는 것이 중요하다

---

## 한줄 정리

Props 전달 방식과 Spread 문법을 활용하여 컴포넌트를 효율적으로 구성하는 방법을 익혔다.

---

## 📅 4주차 (3월 25일)
# 4주차 학습 기록: React 개발 환경 및 컴포넌트 활용

## 1. Vite 업데이트 및 Oxc 컴파일러 전환

최근 Vite의 기본 정책 변화에 따른 리액트 프로젝트 생성 옵션의 변경 사항을 정리합니다.

- SWC 지원 종료 (2026.03.12)
- Oxc 컴파일러 도입 (고성능, 통합 기능)

```bash
npm create vite@latest my-app -- --template react
```

---

## 2. 컴포넌트 내보내기 (Export)

- Named Export → `{}` 사용, 트리 쉐이킹 유리
- Default Export → 파일당 1개, 이름 자유

---

## 3. 컴포넌트 구조 설계

- 기능별 파일 분리 (/components)
- 컴포넌트 내부 정의 금지
- PascalCase 사용

---

## 4. JSX 문법

| 항목 | 내용 |
|------|------|
| 루트 | 하나의 부모 필요 |
| 태그 | `<tag />` |
| JS | `{}` |
| 속성 | camelCase |

---