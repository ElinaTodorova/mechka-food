import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import RecipesCarrouselCard from "./RecipesCarrouselCard";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./RecipesCarrousel.module.css";

export default function RecipesCarrousel() {
  const [random, setRandom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipes`
        );
        const data = await response.json();

        if (data !== null) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setRandom(shuffled.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <Carousel className={styles.carouselGlobal}>
        {random &&
          random.map((recipe) => (
            <Carousel.Item interval={3000} key={recipe.id}>
              <RecipesCarrouselCard
                key={recipe.id}
                id={recipe.id}
                image={recipe.image_url}
              />
              <Carousel.Caption className={styles.carouselImageTitle}>
                {recipe.title}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </section>
  );
}
