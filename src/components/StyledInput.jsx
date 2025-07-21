import styled from "styled-components";

const StyledInput = styled.input`
  /* display: flex;
  justify-content: center; */
  font-size: 1.18rem;
  border: 1px solid #666;
  border-radius: 0.5rem;

  padding: 0.6rem 2rem;
  width: 100%;

  &::placeholder {
    color: #8e979d;
    font-size: 1.1rem;
  }

  &:focus {
    outline: none;
    border-bottom: 3px solid green;
  }

  &:focus:user-invalid {
    border-bottom: 3px solid red;
  }
`;

export default StyledInput;
