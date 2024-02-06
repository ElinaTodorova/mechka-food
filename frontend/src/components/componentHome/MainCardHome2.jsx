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

export default function MainCardHome2() {
  const [random, setRandom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/recipes");
        const data = await response.json();

        if (data !== null) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setRandom(shuffled.slice(0, 1));
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
        random.map((recipes) => (
          <Card
            key={recipes.id}
            sx={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "1rem",
            }}
          >
            <CardMedia
              component="img"
              alt={recipes.title}
              image={recipes.image_url}
              sx={{ width: "50%", height: "100%" }}
            />
            <CardContent
              sx={{
                width: "50%",
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
                De la cuisine du quotidien aux festins mémorables !
              </Typography>
              <Typography variant="body1" sx={{ pt: "5%", pl: "0.5rem" }}>
                Laissez-vous guider par nos étapes simples et nos instructions
                détaillées. Des plats rapides pour les journées chargées aux
                menus élaborés pour les grandes occasions, notre collection
                diversifiée saura satisfaire tous les goûts et toutes les
                envies.
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
