import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';


import '@splidejs/react-splide/css';
const Popular = () => {

  const [popular, setPopular] = useState([]);
  
  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {

    const check = localStorage.getItem('popular');

    if(check){
        setPopular(JSON.parse(check));
    }else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`);
        const data = await api.json();

        localStorage.setItem('popular', JSON.stringify(data.recipes));
        setPopular(data.recipes);
    }
    }
  return (
    <>
      <Wrapper>
        <Title>
          Popular Choices
        </Title>
        <Splide options={{
            perPage: 4,
            arrows: false,
            paginations:false,
            drag: "free",
            gap: "4rem"
        }}>
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Details>
                    {recipe.title}
                  </Details>
                  <Image src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin: 4rem 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const Details = styled.p`
  position: absolute;
  z-index: 10
  left: 50%
  bottom: 0%
  height: 40%
  display: flex;
  font-size: 1.2rem;
  font-weight: 400;
  transform: translate(-50%, 0%);
  color: #fff;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  position: relative;
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
`;

const Image = styled.img`
  border-radius: 2rem;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0,0,0,0), (0,0,0,0.5));
`;

export default Popular