import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.2rem;
  border-radius: var(--border-radius-sm);
  text-align: center;

  &::file-selector-button {
    /* display: none; */
    font: inherit;
    font-weight: 500;
    padding: 0.3rem 0.8rem;
    margin-right: 1.2rem;
    border-radius: 1rem;
    border: 1px solid black;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: grey;
    }
  }
`;

export default FileInput;
