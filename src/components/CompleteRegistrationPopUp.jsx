import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFetchUsersWithId } from "../hooks/useFetchUsers";

// Styled components
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

const Popup = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  padding: 24px;
  width: 380px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Message = styled.p`
  color: #555;
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  ${({ primary }) =>
    primary
      ? `
    background: #144c6f;
    color: white;
    &:hover { background: #052031; }
  `
      : `
    background: #e5e7eb;
    color: #111;
    &:hover { background: #d1d5db; }
  `}
`;

export default function CompleteRegistrationPopup({ user }) {
  const { authenticatedUser } = useFetchUsersWithId(user?.id);
  const authUser = authenticatedUser?.[0];

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // Example profile completeness check
  const state = authUser?.state !== null;
  const localGovt = authUser?.localGovt !== null;
  const NIN = authUser?.NIN !== null;
  const officeAdress = authUser?.officeAdress !== null;

  useEffect(() => {
    if (!state || !localGovt || !NIN || !officeAdress) setShow(true);
  }, [NIN, localGovt, state, officeAdress]);

  if (show === false) return null;
  console.log(show);

  return (
    <Overlay>
      <Popup className="max-[500px]:mx-6.5">
        <Title>Complete Your Registration</Title>
        <Message>
          Your profile is not complete yet. Please finish up your registration
          to get full access.
        </Message>
        <ButtonGroup>
          <Button onClick={() => setShow(false)}>Later</Button>
          <Button primary onClick={() => navigate(`/myaccount/profile`)}>
            Finish Now
          </Button>
        </ButtonGroup>
      </Popup>
    </Overlay>
  );
}
