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

export default function MainCardHome3() {
  const [random, setRandom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/category`
        );
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
        random.map((categories) => (
          <Card
            key={categories.id}
            sx={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "1rem",
            }}
          >
            <CardMedia
              component="img"
              alt={categories.title}
              image={categories.image_url}
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
                Plongez dans un festin de saveurs et d'émotions !
              </Typography>
              <Typography variant="body1" sx={{ pt: "5%", pl: "0.5rem" }}>
                Explorez de nouveaux horizons gastronomiques et créez des
                moments inoubliables en famille ou entre amis. Rien ne réunit
                mieux que le partage d'un délicieux repas préparé avec amour.
              </Typography>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pt: "25%",
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
