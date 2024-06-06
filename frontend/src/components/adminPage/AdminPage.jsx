import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import AdminCard from "./AdminCard";
import styles from "./AdminPage.module.css";

export default function RecipeContainer() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipes`)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  });
  return (
    <section>
      <div className={styles.containerTitle}>
        <Typography
          variant="h4"
          component="h5"
          sx={{
            backgroundColor: "#ffc107",
            borderRadius: "5px",
            width: "20rem",
            color: "whitesmoke",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Toutes les recettes
        </Typography>
      </div>
      <div className={styles.cardPosition}>
        {recipes.map((recipe) => (
          <AdminCard
            key={recipe.id}
            id={recipe.id}
            image={recipe.image_url}
            title={recipe.title}
            description={recipe.descriptions}
          />
        ))}
      </div>
    </section>
  );
}
