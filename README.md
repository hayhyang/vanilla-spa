# Vanilla Javascript로 SPA만들기

### 컴포넌트

### 상태관리

- observer패턴과 flux패턴을 혼합하여 redux 구현
- 기존 redux는 createStore가 subscribe, dispatch, getState 메서드를 가진 객체를 리턴하는 패턴이나
- subscribe메서드는 Object.defindProperty API를 활용한 observable, observe 로 대체

### Virtual DOM

- 상태 변화가 일어나면 재렌더링 됨
- 렌더링은 브라우저에서 가장 큰 연산을 차지
- Diff 알고리즘을 통해 기존과 달라진 DOM만 재렌더링 하는 것이 핵심

### 라우터

### 참고자료

- [황준일님의 블로그](https://junilhwang.github.io/TIL/) Vanilla Javascript 시리즈
- 도서 <프레임워크 없는 프론트엔드 개발>
