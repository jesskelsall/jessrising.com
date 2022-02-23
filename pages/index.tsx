import type { NextPage } from "next";
import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h1`
  color: white;
  margin: 0;
  font-size: 6rem;
  font-weight: bold;
  filter: drop-shadow(0 0 1rem rgba(0, 0, 0, 0.4));
`;

const HomePage: NextPage = () => (
  <Wrapper>
    <Container>
      <Heading>Jessica Rising</Heading>
    </Container>
  </Wrapper>
);

export default HomePage;
