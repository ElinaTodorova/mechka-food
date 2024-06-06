import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { useUserContext } from "../../context/userContext";

const defaultTheme = createTheme();

export default function CommentsByIdRecipe() {
  const [comments, setComments] = useState(null);
  const { id } = useParams();
  const user = useUserContext();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipes/${id}/comment`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  }, [id]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        item
        mt={10}
        pt={10}
        xs={0}
        sm={0}
        md={0}
        component={Paper}
        elevation={0}
        square
      >
        <CssBaseline />
        <Box
          sx={{
            margin: 0,
            display: "flex",
            width: 1,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {comments !== null &&
            comments.map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography component="h1" variant="body1" color="#2962ff">
                  {user.userData.user.username}
                </Typography>

                <TextField
                  sx={{
                    mt: 0,
                    mb: 5,
                  }}
                  multiline
                  fullWidth
                  value={JSON.stringify(comment.comment).replace(/["']/g, "")}
                />
              </Box>
            ))}
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
