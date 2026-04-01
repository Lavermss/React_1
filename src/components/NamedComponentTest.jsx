import * as Foo from "./NamedComponent";

export default function NamedComponentTest() {
  return (
    <>
      <h1>Named Component Test</h1>
      <Foo.NamedComponent1 />
      <Foo.NamedComponent2 />
      <Foo.NamedComponent3 />
    </>
  );
}
