export default function NameCard({ title, id, name, ...rest }) {
  return (
    <div>
      <h1>{title}가 보낸 props입니다.</h1>
      <h2>사용자 정보 </h2>
      <p>ID: {id}</p>
      <p>이름: {name}</p>
      <p>나이: {rest.age}</p>
      <p>직업: {rest.job}</p>
      <p>거주지: {rest.location}</p>
    </div>
  );
}
