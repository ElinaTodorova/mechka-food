import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import RecipeInformations from "./informationsRecipe/RecipeInformations";
import styles from "./RecipeById.module.css";
import GeneralTab from "./newRenderInfo/GeneralTab";
import { useUserContext } from "../../context/userContext";

export default function RecipeById() {
  const [recipes, setRecipes] = useState(null);
  const { id: recipeId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const { userData } = useUserContext();
  const [allFav, setAllFav] = useState([]);

  const handleChangeFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // useEffect pour aller chercher l'id de la recette et afficher la photo, les informations (titre...)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipes/${recipeId}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites/${recipeId}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setAllFav(data));
  }, []);

  // Code pour lier ce qui est des favorites

  useEffect(() => {
    if (allFav.length === 0) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  }, [allFav]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (userData !== "null") {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/recipes/${recipeId}/favorite`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userData.user.id, recipeId }),
            credentials: "include",
          }
        );
        if (response.status === 201) {
          handleChangeFavorite();
        } else {
          console.error(`failed add to favorite, status ${response.status}`);
        }
      }
    } catch (err) {
      console.error("Error posting favorite:", err);
    }
  };
  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/recipes/${recipeId}/deleteFavorite`,
        {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userData.user.id, recipeId }),
          credentials: "include",
        }
      );
      if (response.status === 201) {
        handleChangeFavorite();
      } else {
        console.error(`failed delete to favorite, status ${response.status}`);
      }
    } catch (err) {
      console.error("Error posting favorite:", err);
    }
  };

  return (
    <>
      <section className={styles.RecipeByIdContainer}>
        <div className={styles.containerGlobal}>
          <div>
            {userData !== null && userData !== "null" ? (
              <div>
                {!isFavorite ? (
                  <div className={styles.svgCoeur}>
                    <Fab
                      aria-label="like"
                      sx={{
                        position: "absolute",
                        bottom: "12.5rem",
                        right: "1.5rem",
                        bgcolor: "white",
                      }}
                    >
                      <FavoriteIcon
                        onClick={
                          isFavorite === false ? handleSubmit : handleDelete
                        }
                      />
                    </Fab>
                  </div>
                ) : (
                  <div className={styles.svgCoeur}>
                    <Fab
                      aria-label="like"
                      sx={{
                        position: "absolute",
                        bottom: "12.5rem",
                        right: "1.5rem",
                        bgcolor: "white",
                      }}
                    >
                      <FavoriteIcon
                        sx={{ color: "red" }}
                        onClick={
                          isFavorite === false ? handleSubmit : handleDelete
                        }
                      />
                    </Fab>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {recipes !== null && (
            <RecipeInformations
              image={recipes.image_url}
              title={recipes.title}
              time={recipes.global_time}
              number={recipes.number_persons}
              description={recipes.descriptions}
            />
          )}
        </div>
      </section>
      <section className={styles.positionSection}>
        <div className={styles.positionTab}>
          <GeneralTab />
        </div>
      </section>
    </>
  );
}
