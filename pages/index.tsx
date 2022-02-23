import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";

const CARDS: string[] = [
  "avatar",
  "dnd",
  "overlapping-interests",
  "photography",
];

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-image: url("background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  min-height: 100vh;

  @media (min-width: 768px) {
    align-items: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  width: 450px;

  @media (min-width: 1000px) {
    margin: 3rem;
    width: initial;
  }
`;

const Heading = styled.h1`
  color: white;
  margin: 0 0 1em;
  font-size: 6rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.4);
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const Card = styled.a`
  position: relative;
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.1s linear;

  &:hover {
    box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.8);
  }

  @media (min-width: 1400px) {
    width: 250px;
    height: 250px;
  }
`;

const HomePage: NextPage = () => (
  <Wrapper>
    <Container>
      <Heading>Jessica Rising</Heading>
      <Cards>
        {CARDS.map((card) => (
          <Card key={card}>
            <Image
              alt={card}
              src={`/cards/${card}.jpg`}
              width={250}
              height={250}
            />
          </Card>
        ))}
      </Cards>
    </Container>
  </Wrapper>
);

export default HomePage;
