import styled from "styled-components";

const H1 = styled.h1`
  color: red;
  font-size: 30px;
`;

export default function PageNotFound() {
  return (
    <div className="h-screen flex justify-center items-center">
      <H1>the page url you requested for is not found ❌❌❌</H1>
    </div>
  );
}
