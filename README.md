<h1 align="center">202130402 김민수</h1>
---
## 📅 13주차
# 13주차 학습 기록: State 업데이트 배치처리와 React 프로젝트 배포

---

## 1. React State 업데이트의 배치처리

React에서 `set` 함수로 state 값을 변경하면 새로운 렌더링 요청이 렌더링 큐에 들어간다.

하지만 경우에 따라 React는 state 업데이트를 바로 처리하지 않고, 여러 업데이트를 모아서 한 번에 처리한다.

이것을 **배치처리(batch processing)** 라고 한다.

```jsx
function handleIncrease() {
  setNumber(number + 1); // number는 현재 렌더링 시점의 값
  setNumber(number + 1);
  setNumber(number + 1);
}
```

위 코드에서 `setNumber(number + 1)`을 여러 번 호출하더라도 `number` 값은 현재 렌더링 시점의 값으로 고정되어 있다.

따라서 `number`가 0이었다면 세 번 호출해도 결과는 3이 아니라 1이 될 수 있다.

---

## 2. State는 렌더링 시점의 스냅샷

React의 state는 일반 변수처럼 즉시 바뀌는 값이 아니라, 특정 렌더링 시점의 값을 기억하는 스냅샷처럼 동작한다.

```jsx
const [number, setNumber] = useState(0);

function handleIncrease() {
  setNumber(number + 1);
  console.log(number); // 현재 렌더링 시점의 number 값 출력
}
```

`setNumber`를 호출해도 현재 함수 안의 `number` 값이 바로 바뀌는 것은 아니다.

React는 업데이트 요청을 받은 뒤 다음 렌더링에서 변경된 state 값을 반영한다.

---

## 3. 업데이터 함수 사용

이전 state 값을 기준으로 여러 번 업데이트해야 할 때는 업데이터 함수를 사용한다.

```jsx
setNumber((n) => n + 1); // 이전 state 값을 기준으로 업데이트
```

여기서 `n`은 현재 state의 이전 값을 의미한다.

업데이터 함수를 사용하면 React는 큐에 저장된 업데이트를 순서대로 처리한다.

```jsx
function handleIncrease() {
  setNumber((n) => n + 1);
  setNumber((n) => n + 1);
  setNumber((n) => n + 1);
}
```

위 코드에서는 업데이트 함수가 순서대로 처리되기 때문에 `number` 값이 0이었다면 최종 결과는 3이 된다.

---

## 4. 업데이터 함수 처리 흐름

업데이터 함수를 `set` 함수에 전달하면 React는 다음과 같이 동작한다.

1. 이벤트 핸들러의 나머지 코드가 모두 실행된 뒤 업데이트 함수를 큐에 넣는다.
2. React는 큐를 순회하면서 업데이트를 순서대로 처리한다.
3. 최종적으로 계산된 state 값이 다음 렌더링에 사용된다.

```jsx
setNumber((n) => n + 1);
setNumber((n) => n + 1);
setNumber((n) => n + 1);
```

처리 흐름은 다음과 같이 이해할 수 있다.

| 업데이트 | n | return |
|---|---:|---:|
| `n => n + 1` | 0 | 1 |
| `n => n + 1` | 1 | 2 |
| `n => n + 1` | 2 | 3 |

따라서 최종 state 값은 3이 된다.

---

## 5. number 대신 n을 사용하는 이유

업데이터 함수 안에서 `number` 대신 `n`을 사용하는 이유는 역할을 구분하기 위해서이다.

`number`는 렌더링 후 최종적으로 결정된 state 값을 의미하고, `n`은 업데이터 함수 내부에서 순서대로 계산되는 이전 state 값을 의미한다.

```jsx
setNumber((n) => n + 1); // n은 이전 state 값
```

물론 `n` 대신 다른 이름을 사용할 수도 있다.

하지만 React에서는 보통 state 변수명의 첫 글자를 사용하여 업데이터 함수의 매개변수 이름을 정한다.

예를 들어 state 이름이 `number`이면 `n`, state 이름이 `count`이면 `c`처럼 사용할 수 있다.

---

## 6. State 교체와 업데이트 함수 비교

State를 직접 새 값으로 교체하는 방식과 업데이터 함수를 사용하는 방식은 동작이 다르다.

```jsx
function handleIncrease5() {
  setNumber(number + 5); // 현재 number 기준으로 5 증가
  console.log(number);
  setNumber((n) => n + 1); // 이전 업데이트 결과를 기준으로 1 증가
  console.log(number);
}
```

또 다른 예시는 다음과 같다.

```jsx
function handleIncrease10() {
  setNumber(number + 4); // 현재 number 기준으로 4 증가
  console.log(number);
  setNumber((n) => n + 1); // 앞선 업데이트 결과 기준으로 1 증가
  console.log(number);
  setNumber(10); // 최종 state를 10으로 교체
  console.log(number);
}
```

업데이터 함수는 이전 업데이트 결과를 이어받아 계산하지만, `setNumber(10)`처럼 값을 직접 전달하면 state를 해당 값으로 교체한다.

---

## 7. React 프로젝트 배포 준비

React 프로젝트를 GitHub Pages로 배포하기 위해서는 먼저 `gh-pages` 라이브러리를 설치한다.

```bash
npm i gh-pages
```

그 다음 `package.json` 파일에 `homepage`를 추가한다.

```json
{
  "homepage": "https://사용자이름.github.io/저장소이름",
  "name": "project-name",
  "version": "0.1.0"
}
```

`homepage`는 GitHub Pages에서 배포될 주소를 의미한다.

---

## 8. package.json scripts 설정

배포를 위해 `package.json`의 `scripts`에 `predeploy`와 `deploy` 명령어를 추가한다.

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

`predeploy`는 배포 전에 프로젝트를 빌드하는 명령어이다.

`deploy`는 빌드된 결과물을 `gh-pages` 브랜치에 올리는 명령어이다.

Vite 프로젝트에서는 빌드 폴더명이 보통 `dist`이므로, 상황에 따라 다음처럼 작성할 수 있다.

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

---

## 9. 프로젝트 배포 실행

설정이 끝나면 터미널에서 다음 명령어를 실행한다.

```bash
npm run deploy
```

배포가 성공하면 GitHub 저장소에 `gh-pages` 브랜치가 생성된다.

이후 GitHub 저장소에서 `Settings` → `Pages` 메뉴로 이동한다.

배포 source를 `Deploy from a branch`로 설정하고, branch를 `gh-pages`로 선택한 뒤 저장한다.

---

## 10. GitHub Pages 확인

GitHub Pages 설정이 완료되면 잠시 후 사이트 주소가 생성된다.

```text
https://사용자이름.github.io/저장소이름
```

개인 페이지 저장소처럼 저장소 이름이 `사용자이름.github.io`인 경우에는 다음 주소로 접속할 수 있다.

```text
https://사용자이름.github.io/
```

배포 후에는 사이트에 접속하여 수정한 내용이 정상적으로 반영되었는지 확인한다.

---

## 핵심 정리

- React는 여러 state 업데이트를 모아서 배치처리할 수 있다.
- 같은 렌더링 안에서 state 값은 스냅샷처럼 고정된다.
- 이전 state 값을 기준으로 업데이트할 때는 업데이터 함수를 사용한다.
- `setNumber((n) => n + 1)`에서 `n`은 이전 state 값을 의미한다.
- 업데이터 함수는 큐에 저장된 뒤 순서대로 처리된다.
- 값을 직접 전달하는 `setNumber(10)`은 state를 해당 값으로 교체한다.
- React 프로젝트는 `gh-pages`를 이용해 GitHub Pages에 배포할 수 있다.
- 배포 전 `homepage`, `predeploy`, `deploy` 설정이 필요하다.
- 배포 후 GitHub Pages에서 `gh-pages` 브랜치를 선택하여 사이트를 공개한다.

---

## 한줄 정리

13주차에는 React state 업데이트가 배치처리되는 방식과 업데이터 함수의 동작 원리를 학습하고, React 프로젝트를 GitHub Pages에 배포하는 방법을 실습하였다.

---

## 📅 12주차
# 12주차 학습 기록: State Hook의 동작 원리와 렌더링 과정

---

## 1. State Hook 기본 정리

React에서는 `useState`와 같이 `use`로 시작하는 함수를 Hook이라고 한다.

Hook은 React가 렌더링 중일 때 사용할 수 있는 특별한 함수이며, 컴포넌트가 필요한 기능을 React에게 요청하는 역할을 한다.

```jsx
import { useState } from "react"; // useState Hook 사용

const [index, setIndex] = useState(0); // State 변수와 setter 함수 선언
```

`useState(0)`은 `index`라는 state의 초기값을 0으로 설정한다는 뜻이다.

여기서 `index`는 현재 state 값이고, `setIndex`는 state 값을 변경할 때 사용하는 함수이다.

---

## 2. Hook 사용 시 주의점

Hook은 일반 함수처럼 보이지만 React 안에서 특별한 규칙을 가진다.

1. Hook은 반드시 import해서 사용한다.
2. Hook은 컴포넌트의 최상위 수준에서만 호출해야 한다.
3. 조건문, 반복문, 중첩 함수 내부에서는 Hook을 호출하면 안 된다.

```jsx
export default function Carousel() {
  const [index, setIndex] = useState(0); // 컴포넌트 최상위에서 Hook 호출

  return (
    <div>
      {index}
    </div>
  );
}
```

Hook은 컴포넌트가 어떤 기능을 필요로 하는지 React에게 알려주는 선언문처럼 이해할 수 있다.

---

## 3. 여러 개의 State 사용하기

하나의 컴포넌트에서는 여러 개의 state 변수를 사용할 수 있다.

예를 들어 이미지 캐러셀에서는 현재 이미지 번호를 저장하는 `index`와 설명 표시 여부를 저장하는 `more`를 함께 사용할 수 있다.

```jsx
export default function Carousel() {
  const [index, setIndex] = useState(0); // 현재 이미지 번호 관리
  const [more, setMore] = useState(false); // 설명 표시 여부 관리

  return (
    <div>
      ...
    </div>
  );
}
```

서로 관련이 없는 값이라면 state를 따로 나누어 관리하는 것이 좋다.

반대로 여러 값이 항상 함께 변경된다면 하나의 객체 state로 묶는 것이 더 적절할 수 있다.

---

## 4. 토글 State 만들기

이미지 설명을 보이거나 숨기기 위해 boolean 타입의 state를 사용할 수 있다.

```jsx
const [more, setMore] = useState(false); // false면 설명 숨김, true면 설명 표시

function handleMoreClick() {
  setMore(!more); // 현재 more 값의 반대로 변경
}
```

`more`가 `true`이면 설명을 보여주고, `false`이면 설명을 숨길 수 있다.

```jsx
<button onClick={handleMoreClick}>
  {more ? "Hide description" : "Show description"}
</button>

{more && <p>{slide.description}</p>}
```

삼항 연산자를 사용하여 버튼 문구를 상태에 따라 다르게 출력할 수 있고, `&&` 연산자를 사용하여 특정 조건일 때만 설명을 출력할 수 있다.

---

## 5. Carousel 컴포넌트 예시

```jsx
import { useState } from "react";
import { galleryImages } from "./imgData.jsx";
import styles from "./Carousel.module.css";

export default function Carousel() {
  const [index, setIndex] = useState(0); // 현재 이미지 index
  const [more, setMore] = useState(false); // 설명 표시 여부

  function handleNext() {
    if (index === galleryImages.length - 1) {
      setIndex(0); // 마지막 이미지면 처음으로 이동
    } else {
      setIndex(index + 1); // 다음 이미지로 이동
    }
  }

  function handlePrevious() {
    if (index === 0) {
      setIndex(galleryImages.length - 1); // 첫 이미지면 마지막으로 이동
    } else {
      setIndex(index - 1); // 이전 이미지로 이동
    }
  }

  function handleMoreClick() {
    setMore(!more); // 설명 표시 상태 전환
  }

  let slide = galleryImages[index]; // 현재 index의 이미지 선택

  return (
    <section className={styles.wrapper}>
      <h2>
        <i>{slide.name}</i>
        <br />
        by {slide.artist}
      </h2>

      <h3>
        ({index + 1} of {galleryImages.length})
      </h3>

      <img src={slide.url} alt={slide.alt} />

      <div>
        <button className={styles.button} onClick={handlePrevious}>
          Previous
        </button>

        <button className={styles.button} onClick={handleNext}>
          Next
        </button>
      </div>

      <button className={styles.button} onClick={handleMoreClick}>
        {more ? "Hide description" : "Show description"}
      </button>

      {more && <p>{slide.description}</p>}
    </section>
  );
}
```

---

## 6. 렌더링 과정의 3단계

React는 컴포넌트가 화면에 표시되기 전에 렌더링 과정을 거친다.

React의 렌더링 과정은 크게 3단계로 나눌 수 있다.

1. 렌더링 트리거
2. 컴포넌트 렌더링
3. DOM에 커밋

---

## 7. 1단계: 렌더링 트리거

렌더링이 시작되는 이유는 크게 두 가지이다.

1. 컴포넌트의 초기 렌더링
2. 컴포넌트의 state 업데이트

초기 렌더링은 앱이 처음 실행될 때 발생한다.

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`createRoot(...).render(...)`가 호출되면 React는 App 컴포넌트를 화면에 렌더링하기 시작한다.

State가 업데이트되는 경우에도 렌더링이 다시 발생한다.

```jsx
setIndex(index + 1); // state 업데이트로 렌더링 트리거
```

State를 변경하면 React는 해당 컴포넌트를 다시 렌더링해야 한다고 판단한다.

---

## 8. 렌더링 큐

State가 업데이트되면 React는 렌더링 요청을 렌더링 큐에 추가한다.

렌더링 큐는 먼저 요청된 작업부터 순서대로 처리하는 자료구조이다.

즉, React는 state 업데이트 요청을 받은 뒤 즉시 DOM을 바꾸는 것이 아니라, 필요한 렌더링 작업을 순서대로 처리한다.

---

## 9. 2단계: 컴포넌트 렌더링

렌더링 단계에서 React는 컴포넌트를 호출하여 화면에 무엇을 표시해야 하는지 계산한다.

이때 컴포넌트 함수가 실행되고 JSX가 반환된다.

```jsx
function App() {
  return (
    <h1>Hello React</h1>
  );
}
```

이 단계에서는 실제 DOM을 바로 수정하는 것이 아니라, 어떤 UI가 필요한지 계산하는 과정이라고 볼 수 있다.

---

## 10. 3단계: DOM에 커밋

렌더링이 끝나면 React는 계산된 결과를 실제 DOM에 반영한다.

초기 렌더링에서는 생성된 DOM 노드를 화면에 추가한다.

리렌더링에서는 이전 결과와 비교하여 변경이 필요한 최소한의 부분만 DOM에 반영한다.

```jsx
root.render(<App />); // 렌더링 결과를 DOM에 반영
```

이 과정을 커밋이라고 한다.

---

## 11. 스냅샷처럼 동작하는 State

State 변수는 일반 JavaScript 변수처럼 바로 변경되는 값이 아니다.

State는 특정 렌더링 시점의 값을 기억하는 스냅샷처럼 동작한다.

```jsx
function handleClick() {
  setIndex(index + 1); // 다음 렌더링에 사용할 state 변경 요청
  console.log(index); // 현재 렌더링 시점의 index 값 출력
}
```

`setIndex`를 호출해도 현재 코드 안의 `index` 값이 즉시 바뀌는 것은 아니다.

React는 업데이트된 state 값을 바탕으로 다음 렌더링을 진행하고, 그 렌더링에서 새로운 state 값을 사용한다.

---

## 12. State 업데이트 흐름

상호작용이 발생하면 React는 다음 순서로 동작한다.

1. React에 state 업데이트를 요청한다.
2. React가 state 값을 업데이트한다.
3. React는 업데이트된 state 값의 스냅샷을 컴포넌트에 전달한다.
4. 컴포넌트는 새로운 props와 이벤트 핸들러가 포함된 UI 스냅샷을 반환한다.
5. React는 변경된 내용을 DOM에 커밋한다.

```jsx
function handleNext() {
  setIndex(index + 1); // React에 state 업데이트 요청
}
```

State는 컴포넌트 내부에 직접 존재하는 일반 변수가 아니라 React 내부에서 관리되는 값이다.

---

## 핵심 정리

- `useState`는 컴포넌트의 상태를 기억하기 위한 Hook이다.
- Hook은 컴포넌트 최상위에서만 호출해야 한다.
- 하나의 컴포넌트 안에서 여러 개의 state를 사용할 수 있다.
- 관련 없는 state는 나누어 관리하는 것이 좋다.
- boolean state를 사용하면 보이기/숨기기 같은 토글 기능을 구현할 수 있다.
- React의 렌더링 과정은 렌더링 트리거 → 컴포넌트 렌더링 → DOM 커밋 순서로 진행된다.
- State 업데이트는 렌더링을 다시 발생시키는 트리거가 된다.
- State는 일반 변수처럼 바로 바뀌는 것이 아니라 특정 렌더링 시점의 스냅샷처럼 동작한다.
- `setState`를 호출하면 React가 다음 렌더링에서 변경된 state 값을 반영한다.

---

## 한줄 정리

12주차에는 `useState` Hook의 사용 규칙과 여러 개의 state 관리 방법, 그리고 React가 state 변경 후 렌더링하고 DOM에 커밋하는 전체 흐름을 학습하였다.

---

## 📅 11주차
# 11주차 학습 기록: State Hook과 이미지 캐러셀 구현

---

## 1. 로컬 변수 방식의 한계

이전 실습에서는 이미지 캐러셀을 만들기 위해 `index` 변수를 선언하고, 버튼 클릭 시 값을 증가시키는 방식으로 구현하였다.

```jsx
let index = 0; // 현재 이미지 순서 저장

function handleClick() {
  index = index + 1; // 클릭 시 index 증가
  console.log(index);
}
```

하지만 지역 변수는 컴포넌트의 상태를 저장하는 용도로 사용하기 어렵다.

이벤트 핸들러를 통해 변수 값이 변경되어도 React 컴포넌트는 다시 렌더링되지 않기 때문에 화면에는 변경된 값이 반영되지 않는다.

---

## 2. 이미지 데이터 불러오기

이미지를 캐러셀에서 사용하기 위해 이미지 데이터를 별도 파일에서 import하였다.

```jsx
import { galleryImages } from "./imgData.jsx"; // 이미지 데이터 import
```

또는 로컬 이미지 파일을 따로 관리하기 위해 이미지 폴더 안에 `index.jsx` 파일을 만들 수 있다.

```jsx
import slider1 from "./locallmg1.jpg";
import slider2 from "./locallmg2.jpg";

export const slide = { // 이미지 모듈화
  slider1,
  slider2,
};
```

이미지가 많아질수록 컴포넌트 안에서 직접 import하는 방식은 코드가 복잡해지므로, 이미지 관리 파일을 따로 두는 것이 좋다.

---

## 3. 이미지 캐러셀 기본 구조

캐러셀은 현재 보여줄 이미지의 번호를 `index`로 관리하고, 해당 index에 맞는 이미지 정보를 화면에 출력하는 구조이다.

```jsx
import { galleryImages } from "./imgData.jsx";

export default function Carousel() {
  let index = 0; // 현재 이미지 index

  function handleClick() {
    index = index + 1; // 다음 이미지로 이동
    console.log(index);
  }

  let slide = galleryImages[index]; // index에 맞는 이미지 선택

  return (
    <>
      <button onClick={handleClick}>Next</button>

      <h2>
        <i>{slide.name}</i>
        <br />
        by {slide.artist}
      </h2>

      <h3>
        ({index + 1} of {galleryImages.length})
      </h3>

      <img src={slide.url} alt={slide.alt} />

      <p>{slide.description}</p>
    </>
  );
}
```

이 코드에서는 버튼을 클릭하면 `index` 값은 증가하지만, 화면이 다시 렌더링되지 않기 때문에 이미지가 바뀌지 않는 문제가 발생한다.

---

## 4. State Hook의 필요성

React에서는 컴포넌트가 기억해야 하는 값을 State로 관리한다.

State는 화면에 표시되는 값이 사용자의 동작에 따라 바뀌어야 할 때 사용한다.

예를 들어 캐러셀에서 다음 버튼을 누르면 다음 이미지가 표시되어야 하므로, 현재 이미지 번호인 `index`는 State로 관리하는 것이 적절하다.

---

## 5. useState 사용 방법

React에서 State를 사용하려면 `useState`를 import해야 한다.

```jsx
import { useState } from "react"; // useState Hook import
```

그 다음 기존에 일반 변수로 선언했던 `index`를 State 변수로 변경한다.

```jsx
const [index, setIndex] = useState(0); // State 변수와 setter 함수 선언
```

여기서 `index`는 현재 State 값을 의미하고, `setIndex`는 State 값을 변경하는 함수이다.

`useState(0)`은 index의 초기값을 0으로 설정한다는 의미이다.

---

## 6. State Hook의 기본 동작 원리

React에서 `use`로 시작하는 함수를 Hook이라고 한다.

Hook은 React가 렌더링 중일 때만 사용할 수 있는 특별한 함수이다.

`useState`는 React에서 제공하는 Hook 중 하나이며, 컴포넌트가 현재 상태를 기억할 수 있도록 도와준다.

Hook을 사용할 때는 몇 가지 규칙이 있다.

1. Hook은 반드시 import해서 사용한다.
2. Hook은 컴포넌트의 최상위 수준에서만 호출해야 한다.
3. 조건문, 반복문, 중첩 함수 내부에서는 Hook을 호출하면 안 된다.

---

## 7. State 값 변경 시 주의점

State 값을 변경할 때는 기존 변수처럼 직접 수정하지 않고 setter 함수를 사용해야 한다.

```jsx
setIndex(index + 1); // setter 함수로 State 변경
```

잘못된 방식은 다음과 같다.

```jsx
index = index + 1; // State 직접 수정은 부적절
```

State는 setter 함수를 통해 변경해야 React가 값이 바뀐 것을 알고 화면을 다시 렌더링할 수 있다.

---

## 8. console.log 출력 시 주의점

State 값을 변경한 직후 `console.log(index)`를 실행하면 변경 전 값이 출력될 수 있다.

```jsx
function handleClick() {
  setIndex(index + 1); // State 변경 요청
  console.log(index); // 변경 전 값이 출력될 수 있음
}
```

이는 State 변경이 즉시 변수에 반영되는 것이 아니라, 다음 렌더링 과정에서 반영되기 때문이다.

따라서 버튼을 클릭했을 때 화면은 다음 렌더링에서 변경된 State 값을 기준으로 갱신된다.

---

## 9. 다음 이미지로 이동하기

Next 버튼을 클릭하면 `index` 값을 1씩 증가시켜 다음 이미지를 보여줄 수 있다.

```jsx
function handleNext() {
  setIndex(index + 1); // 다음 이미지 index로 변경
}
```

하지만 마지막 이미지에서 계속 증가하면 배열 범위를 벗어날 수 있으므로 조건 처리가 필요하다.

```jsx
function handleNext() {
  if (index === galleryImages.length - 1) { // 마지막 이미지인지 확인
    setIndex(0);
  } else {
    setIndex(index + 1);
  }
}
```

위 코드는 마지막 이미지에 도달하면 다시 첫 번째 이미지로 돌아가도록 만든다.

---

## 10. 이전 이미지로 이동하기

Previous 버튼을 클릭하면 `index` 값을 1씩 감소시켜 이전 이미지를 보여줄 수 있다.

```jsx
function handlePrevious() {
  setIndex(index - 1); // 이전 이미지 index로 변경
}
```

첫 번째 이미지에서 이전 버튼을 누르면 음수 index가 될 수 있으므로 조건 처리가 필요하다.

```jsx
function handlePrevious() {
  if (index === 0) { // 첫 번째 이미지인지 확인
    setIndex(galleryImages.length - 1);
  } else {
    setIndex(index - 1);
  }
}
```

위 코드는 첫 번째 이미지에서 Previous 버튼을 누르면 마지막 이미지로 이동하도록 만든다.

---

## 11. 캐러셀 최종 구조

```jsx
import { useState } from "react"; // State Hook 사용
import { galleryImages } from "./imgData.jsx"; // 이미지 데이터 사용
import styles from "./Carousel.module.css";

export default function Carousel() {
  const [index, setIndex] = useState(0); // 현재 이미지 index를 State로 관리

  function handleNext() {
    if (index === galleryImages.length - 1) { // 마지막이면 처음으로 이동
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function handlePrevious() {
    if (index === 0) { // 처음이면 마지막으로 이동
      setIndex(galleryImages.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  let slide = galleryImages[index]; // 현재 index의 이미지 정보

  return (
    <section className={styles.wrapper}>
      <h2>
        <i>{slide.name}</i>
        <br />
        by {slide.artist}
      </h2>

      <h3>
        ({index + 1} of {galleryImages.length})
      </h3>

      <img src={slide.url} alt={slide.alt} />

      <div>
        <button className={styles.button} onClick={handlePrevious}>
          Previous
        </button>

        <button className={styles.button} onClick={handleNext}>
          Next
        </button>
      </div>

      <p>{slide.description}</p>
    </section>
  );
}
```

---

## 12. CSS Module 적용

캐러셀 컴포넌트에도 CSS Module을 적용하여 스타일을 분리할 수 있다.

```css
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
```

CSS Module을 사용하면 클래스명이 다른 컴포넌트와 충돌하지 않고, 컴포넌트 단위로 스타일을 관리할 수 있다.

---

## 핵심 정리

- 지역 변수는 컴포넌트의 상태 저장에 적합하지 않다.
- 지역 변수 값이 변경되어도 React는 자동으로 다시 렌더링하지 않는다.
- React에서 상태를 관리할 때는 `useState` Hook을 사용한다.
- `useState`는 현재 값과 값을 변경하는 setter 함수를 반환한다.
- State 값을 변경할 때는 직접 수정하지 않고 setter 함수를 사용해야 한다.
- State 변경 직후의 `console.log`는 이전 값이 출력될 수 있다.
- 캐러셀은 현재 이미지 index를 State로 관리하여 구현할 수 있다.
- 마지막 이미지 다음에는 첫 번째 이미지로, 첫 번째 이미지 이전에는 마지막 이미지로 이동하도록 조건 처리가 필요하다.
- 이미지 파일은 index 파일로 모듈화하면 관리하기 편하다.
- CSS Module을 사용하면 컴포넌트별 스타일 관리가 가능하다.

---

## 한줄 정리

11주차에는 `useState` Hook을 활용하여 컴포넌트의 상태를 관리하고, 이미지 index 값을 변경해 Previous와 Next 버튼이 있는 이미지 캐러셀을 구현하는 방법을 학습하였다.

---

## 📅 10주차
# 10주차 학습 기록: 이벤트 전파, 기본 동작 방지, State와 이미지 관리

---

## 1. 이벤트 전파 이해

React에서 이벤트는 자식 요소에서 발생한 뒤 부모 요소로 전달될 수 있다.

예를 들어 `<nav>` 안에 `<button>`이 있을 때 버튼을 클릭하면 버튼의 클릭 이벤트가 먼저 실행되고, 이후 부모인 nav의 클릭 이벤트도 함께 실행될 수 있다.

이러한 흐름을 이벤트 전파라고 한다.

```jsx
<nav onClick={() => alert("네비게이션바 클릭!")}>
  <button onClick={() => alert("버튼1 클릭!")}>
    버튼1
  </button>

  <button onClick={() => alert("버튼2 클릭!")}>
    버튼2
  </button>
</nav>
```

위 코드에서는 버튼을 클릭했을 때 버튼 이벤트뿐만 아니라 부모 요소인 nav의 이벤트도 함께 실행될 수 있다.

---

## 2. 이벤트 전파의 중지

이벤트가 부모 요소까지 전달되지 않게 하려면 `e.stopPropagation()`을 사용한다.

이벤트 핸들러는 이벤트 객체를 매개변수로 받을 수 있으며, 일반적으로 `event` 또는 `e`라는 이름으로 사용한다.

```jsx
function Button({ onClick, children }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
```

`e.stopPropagation()`을 사용하면 버튼 클릭 이벤트가 부모 요소인 nav까지 전달되지 않는다.

---

## 3. 이벤트 핸들러를 props로 전달

부모 컴포넌트에서 이벤트 함수를 만들고, 자식 컴포넌트에 props로 전달할 수 있다.

```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```jsx
export default function Bubble() {
  return (
    <>
      <h1>Bubble</h1>

      <nav onClick={() => alert("네비게이션바 클릭!")}>
        <Button onClick={() => alert("버튼1 클릭!")}>
          버튼1
        </Button>

        <Button onClick={() => alert("버튼2 클릭!")}>
          버튼2
        </Button>
      </nav>
    </>
  );
}
```

이 구조를 사용하면 Button 컴포넌트는 화면 출력 역할을 담당하고, 실제 실행할 이벤트 함수는 부모 컴포넌트에서 관리할 수 있다.

---

## 4. CSS Module 적용

CSS Module을 사용하면 컴포넌트별로 스타일을 분리하여 관리할 수 있다.

파일명은 보통 `컴포넌트명.module.css` 형태로 작성한다.

```css
/* Bubble.module.css */

.title {
  font-size: 24px;
  font-weight: bold;
}

.navBar {
  display: flex;
  padding: 10px;
  background-color: #666;
}

.button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
```

```jsx
import style from "./Bubble.module.css";

export default function Bubble() {
  return (
    <>
      <h1 className={style.title}>Bubble</h1>

      <nav className={style.navBar} onClick={() => alert("네비게이션바 클릭!")}>
        <button className={style.button} onClick={() => alert("버튼1 클릭!")}>
          버튼1
        </button>

        <button className={style.button} onClick={() => alert("버튼2 클릭!")}>
          버튼2
        </button>
      </nav>
    </>
  );
}
```

---

## 5. 브라우저 기본 동작 방지

브라우저 이벤트 중에는 기본 동작을 가지고 있는 이벤트가 있다.

예를 들어 form을 제출하는 `onSubmit` 이벤트는 기본적으로 페이지를 새로고침한다.

이 기본 동작을 막기 위해 `e.preventDefault()`를 사용한다.

```jsx
export default function Signup1() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("제출되었습니다.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="이름을 입력하세요" />
      <button type="submit">제출</button>
    </form>
  );
}
```

`e.preventDefault()`는 브라우저가 가진 기본 동작을 막을 때 사용한다.

---

## 6. stopPropagation과 preventDefault 차이

`e.stopPropagation()`과 `e.preventDefault()`는 비슷해 보이지만 서로 다른 기능을 가진다.

| 구분 | 기능 |
|------|------|
| `e.stopPropagation()` | 이벤트가 부모 요소로 전달되는 것을 막음 |
| `e.preventDefault()` | 브라우저의 기본 동작을 막음 |

```jsx
e.stopPropagation();
```

```jsx
e.preventDefault();
```

이벤트 전파를 막을 때는 `stopPropagation`, form 제출이나 링크 이동 같은 기본 동작을 막을 때는 `preventDefault`를 사용한다.

---

## 7. State 개념

State는 컴포넌트가 기억해야 하는 값이다.

React 컴포넌트는 사용자의 동작에 따라 화면 내용이 바뀌어야 하는 경우가 많다.

예를 들어 이미지 캐러셀에서 다음 버튼을 누르면 현재 보여주는 이미지가 변경되어야 한다.

이처럼 컴포넌트가 현재 상태를 기억하고 화면을 다시 렌더링하기 위해 사용하는 값이 State이다.

---

## 8. 로컬 변수에 컴포넌트 상태 저장

가장 단순한 방식으로 로컬 변수를 사용하여 현재 이미지의 index 값을 저장할 수 있다.

```jsx
let index = 0;

function handleNextClick() {
  index = index + 1;
}
```

하지만 일반 로컬 변수는 값이 바뀌어도 React가 화면을 다시 렌더링하지 않는다.

따라서 실제 React에서는 `useState` Hook을 사용하여 상태를 관리하는 것이 적절하다.

---

## 9. 이미지 모듈 관리

로컬 이미지를 사용할 때는 이미지를 직접 import해서 사용할 수 있다.

```jsx
import slider1 from "./locallmg1.jpg";
import slider2 from "./locallmg2.jpg";

export const slide = { slider1, slider2 };
```

이미지가 많아지면 컴포넌트 안에서 이미지를 하나씩 import하는 코드가 길어질 수 있다.

이때 이미지 폴더 안에 `index.jsx` 파일을 만들어 이미지를 한 곳에서 관리하면 코드가 깔끔해진다.

```jsx
import slider1 from "./locallmg1.jpg";
import slider2 from "./locallmg2.jpg";

export const slide = {
  slider1,
  slider2,
};
```

이렇게 작성해두면 다른 컴포넌트에서 이미지 모듈을 불러와 사용할 수 있다.

---

## 10. 캐러셀 구현 방향

이미지 캐러셀은 현재 보여줄 이미지의 index 값을 저장하고, 버튼 클릭 시 index 값을 변경하는 방식으로 만들 수 있다.

```jsx
const images = [
  slide.slider1,
  slide.slider2,
];

let index = 0;
```

```jsx
function handleNextClick() {
  index = index + 1;
}
```

다만 로컬 변수만 사용할 경우 화면이 자동으로 갱신되지 않기 때문에, 이후에는 `useState`를 사용하여 현재 index 값을 관리해야 한다.

---

## 핵심 정리

- 이벤트는 자식 요소에서 부모 요소로 전파될 수 있다
- `e.stopPropagation()`은 이벤트 전파를 중지한다
- `e.preventDefault()`는 브라우저 기본 동작을 막는다
- 이벤트 핸들러는 props로 전달할 수 있다
- CSS Module을 사용하면 컴포넌트별 스타일 관리가 가능하다
- State는 컴포넌트가 기억해야 하는 값이다
- 이미지가 많을 경우 index 파일로 모듈화하면 관리가 편하다
- 캐러셀은 현재 이미지 index 값을 기준으로 화면을 변경하는 구조이다

---

## 한줄 정리

10주차에는 이벤트 전파와 기본 동작 방지, CSS Module 적용, State 개념과 이미지 모듈 관리를 활용하여 재사용 가능한 컴포넌트 구조와 캐러셀 구현의 기초를 학습하였다.

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