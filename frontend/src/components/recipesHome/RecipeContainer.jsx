import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import styles from "./RecipeContainer.module.css";

export default function RecipeContainer() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipes`)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);
  return (
    <section className={styles.globalContainer}>
      <div>
        <h3 className={styles.titleRecipeContainer}>
          Découvrez nos suggestions
        </h3>
      </div>
      <div className={styles.cardPosition}>
        {recipes.map((recipe) => (
          <RecipeCard
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
