import { useState, useEffect } from "react";
import "@fontsource/italiana";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

export default function MainCardHome() {
  const [random, setRandom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipes`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data !== null) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setRandom(shuffled.slice(3, 4));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return (
    <Container
      sx={{
        width: "100%",
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {random !== null &&
        random.map((recipe) => (
          <Card
            key={recipe.id}
            sx={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "1rem",
            }}
          >
            <CardMedia
              component="img"
              alt={recipe.title}
              image={recipe.image_url}
              sx={{ width: "60%", height: "100%" }}
            />
            <CardContent
              sx={{
                width: "40%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "#fff8e6",
              }}
            >
              <Typography
                variant="h4"
                fontFamily="italiana"
                fontWeight="bold"
                sx={{ pl: "0.5rem", pt: "10%" }}
              >
                Découvrez le plaisir de cuisiner avec nos recettes !
              </Typography>
              <Typography variant="body1" sx={{ pt: "5%", pl: "0.5rem" }}>
                Plongez dans un monde de saveurs exquises et d'arômes
                envoûtants. Que vous soyez novice en cuisine ou chef
                expérimenté, nos recettes sont conçues pour émerveiller vos
                papilles et éveiller votre créativité culinaire.
              </Typography>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pt: "15%",
                }}
              >
                <Link to="/recipes/search">
                  <Fab size="small" sx={{ bgcolor: "white" }}>
                    <ArrowForwardIcon />
                  </Fab>
                </Link>
              </Container>
            </CardContent>
          </Card>
        ))}
    </Container>
  );
}
