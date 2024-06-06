import { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Container } from "@mui/material";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import styles from "./ProfilComponent.module.css";
import Sidebar from "../sidebar/Sidebar";
import { useUserContext } from "../../context/userContext";
import RecipeCardUser from "./RecipeCardUser";

export default function ProfilComponent() {
  const [recipes, setRecipes] = useState([]);
  const [recipeCount, setRecipeCount] = useState(0);

  const { userData } = useUserContext();

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/recipes/user/${
      userData.user.id
    }`;

    fetch(apiUrl, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setRecipeCount(data.length); // Mettez à jour le nombre de recettes
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des recettes:", error)
      );
  }, [userData]);

  return (
    <>
      <Header />
      <Sidebar />
      <Container
        sx={{
          pt: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <section className={styles.outline}>
          <img
            className={styles.imageProfil}
            src="https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Profil"
          />
        </section>
        <Card
          orientation="horizontal"
          sx={{
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
            <img
              src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              srcSet="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent key={userData.id}>
            <Typography fontSize="xl" fontWeight="lg">
              Username: {userData.user.username}
            </Typography>
            <Typography
              level="body-sm"
              fontWeight="lg"
              textColor="text.tertiary"
            >
              Prénom: {userData.user.firstname}
            </Typography>
            <Typography
              level="body-sm"
              fontWeight="lg"
              textColor="text.tertiary"
            >
              Nom: {userData.user.lastname}
            </Typography>
            <Sheet
              sx={{
                bgcolor: "background.level1",
                borderRadius: "sm",
                p: 1.5,
                my: 1.5,
                display: "flex",
                gap: 2,
                "& > div": { flex: 1 },
              }}
            >
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Recipes
                </Typography>
                <Typography fontWeight="lg">{recipeCount}</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Comment
                </Typography>
                <Typography fontWeight="lg">980</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Rating
                </Typography>
                <Typography fontWeight="lg">8.9</Typography>
              </div>
            </Sheet>
          </CardContent>
        </Card>
      </Container>
      <div className={styles.cardPosition}>
        {recipes.map((recipe) => (
          <RecipeCardUser
            key={recipe.id}
            id={recipe.id}
            image={recipe.image_url}
            title={recipe.title}
            description={recipe.descriptions}
          />
        ))}
      </div>
      <Navbar />
    </>
  );
}
