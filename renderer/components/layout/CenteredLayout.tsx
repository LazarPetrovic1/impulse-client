import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px;
  height: 100%;
  width: 100%;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 800px;
`;

export const CenteredLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};