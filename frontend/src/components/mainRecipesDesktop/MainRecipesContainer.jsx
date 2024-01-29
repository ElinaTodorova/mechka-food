import { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import styles from "./MainRecipesContainer.module.css";

export default function MainRecipesContainer() {
  const [random, setRandom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/recipes");
        const data = await response.json();

        if (data !== null) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setRandom(shuffled.slice(0, 7));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ImageList
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          overflow: "hidden",
        }}
        variant="quilted"
        gap={20}
      >
        {random !== null &&
          random.map((recipe, index) => (
            <ImageListItem
              key={recipe.id}
              sx={{
                width: index === 0 ? 600 : 300,
                height: index === 0 ? 650 : 300,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link to={`/recipes/${recipe.id}`}>
                <img
                  className={styles.imageCardRecipes}
                  srcSet={`${recipe.image_url}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  src={`${recipe.image_url}?w=161&fit=crop&auto=format`}
                  alt={recipe.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Link>
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  width: index === 0 ? 600 : 300,
                }}
                title={recipe.title}
                position="bottom"
                actionPosition="left"
              />
            </ImageListItem>
          ))}
      </ImageList>
    </Box>
  );
}
