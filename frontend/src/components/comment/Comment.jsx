import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CommentsByIdRecipe from "./commentsByIdRecipe";
import ConnectionVerification from "../modal/ConnectionVerification";
import { useUserContext } from "../../context/userContext";

const defaultTheme = createTheme();

export default function Comment() {
  const [recipeImage, setRecipeImage] = useState(null);
  const [comment, setComment] = useState("");
  const { id: CommentRecipeId } = useParams();
  const user = useUserContext();

  // Hook pour la navigation
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/recipes/${CommentRecipeId}/comment`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment, CommentRecipeId }),
          credentials: "include",
        }
      );

      if (response.status === 201) {
        console.info("Comment posted successfully!");
        setComment("");
        refreshPage();
      } else {
        console.error("Failed to post comment:", response);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };
  const idRecipe = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipes/${idRecipe.id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setRecipeImage(data.image_url));
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          pt={10}
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={0}
          square
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate(-1)}
          >
            Retour
          </Button>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CommentsByIdRecipe />
          </Box>
          {user !== null ? (
            <Box
              sx={{
                my: 8,
                mx: 7,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Laissez un commentaire !
              </Typography>
              <TextField
                sx={{ mt: 5, mb: 2 }}
                fullWidth
                margin="normal"
                name="comment"
                label="Donnez votre avis"
                type="comment"
                id="comment"
                value={comment}
                onChange={handleInputChange}
              />
              {comment.length > 0 ? (
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Ajouter
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  disabled
                  onClick={handleSubmit}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Ajouter
                </Button>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                my: 8,
                mx: 7,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ConnectionVerification />
            </Box>
          )}
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${recipeImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
