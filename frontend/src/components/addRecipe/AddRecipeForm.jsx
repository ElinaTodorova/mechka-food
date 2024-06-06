import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import styles from "./AddRecipeForm.module.css";
import RecipeForm from "./RecipeForm";
import InstructionsForm from "./InstructionsForm";
import IngredientsForm from "./IngredientsForm";
import CategoriesSelect from "./CategoriesSelect";
import { useUserContext } from "../../context/userContext";

const defaultTheme = createTheme();

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddRecipeForm() {
  const navigate = useNavigate();
  const [persons, setPersons] = useState("");
  const [instructions, setInstructions] = useState([{ id: 0, step: "" }]);
  const [title, setTitle] = useState("");
  const [descriptions, setDescription] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [userIngredients, setUserIngredients] = useState([
    {
      id: null,
      quantity: "",
      unit: "",
    },
  ]);
  const [timeCook, settimeCook] = useState("");
  const [isSuccess, setIsSucces] = useState(false);
  const [categories, setCategories] = useState([]);
  const [userCategorieId, setUserCategoryId] = useState("");
  const [image, setImage] = useState();
  const { userData } = useUserContext();

  const MaxLengthTitleIngredients = 50;
  const MaxLengthDescriptionInstructions = 250;

  // Get all ingredients from our database (need for autocomlete)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipes/ingredients`
        );
        const data = await response.json();

        setAllIngredients(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Get all categories from our database
  useEffect(() => {
    const fetchDataCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/category`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDataCategories();
  }, []);

  // Request POST from body frontend to back-end

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("descriptions", descriptions);
    formData.append("globalTime", timeCook);
    formData.append("numberPersons", persons);
    formData.append("userId", userData.user.id);
    formData.append("instructions", JSON.stringify(instructions));
    formData.append("userIngredients", JSON.stringify(userIngredients));
    formData.append("userCategorieId", userCategorieId);
    formData.append("recipeimage", image.get("recipeimage")); // Assuming "image" is the key for your image field

    const postData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipes/add`,
          {
            method: "post",
            body: formData,
            credentials: "include",
          }
        );

        if (response.status === 201) {
          navigate("/");
          setIsSucces(true);
        } else {
          console.info(response);
        }
      } catch (err) {
        console.error(err);
      }
    };

    postData();
  };

  const handleChangeCookTime = (e) => {
    if (e.target.value.length <= 20) {
      settimeCook(e.target.value);
    }
  };

  const handleChange = (event) => {
    setPersons(event.target.value);
  };

  const handleImage = (event) => {
    const formData = new FormData();
    formData.append(
      "recipeimage",
      event.target.files[0],
      event.target.files[0].name
    );
    setImage(formData);
  };

  return (
    <>
      {isSuccess === true && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your recipe has been added successfully!
        </Alert>
      )}
      <section className={styles.section}>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="70">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h2" variant="h3">
                Nouvelle Recette
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
                encType="multipart/form-data"
              >
                <RecipeForm
                  maxTitle={MaxLengthTitleIngredients}
                  maxDescription={MaxLengthDescriptionInstructions}
                  title={title}
                  setTitle={setTitle}
                  description={descriptions}
                  setDescription={setDescription}
                />
                <InstructionsForm
                  maxLength={MaxLengthDescriptionInstructions}
                  instructions={instructions}
                  setInstructions={setInstructions}
                />
                <div className={styles.containerIng}>
                  <IngredientsForm
                    className={styles.ingredientInput}
                    ingredients={allIngredients}
                    userIngredients={userIngredients}
                    setUserIngredients={setUserIngredients}
                  />
                </div>
                <TextField
                  style={{ marginTop: "2rem" }}
                  margin="normal"
                  required
                  fullWidth
                  id="Temps de préparation"
                  label="Temps de préparation"
                  name="Temps de préparation"
                  autoComplete="Temps de préparation"
                  onChange={handleChangeCookTime}
                  value={timeCook}
                  autoFocus
                />
                <div>
                  {timeCook.length === 0 && <p> 🚨 Champ requis.</p>}
                  {timeCook.length === 20 && <p> 🚨 Maximum 20 caractères.</p>}
                </div>
                <FormControl
                  style={{ marginTop: "2rem", marginBottom: "2rem" }}
                  fullWidth
                >
                  <InputLabel id="numberPersons">
                    Nombre de personnes
                  </InputLabel>
                  <Select
                    labelId="numberPersons"
                    id="numberPersons"
                    value={persons}
                    label="Nombre de personnes"
                    onChange={handleChange}
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                  </Select>
                  {persons === "" && (
                    <p>🚨 Vous devez choisir le nombre de personnes.</p>
                  )}
                </FormControl>
                <CategoriesSelect
                  categories={categories}
                  setUserCategoryId={setUserCategoryId}
                  userCategoryId={userCategorieId}
                />
                <Button
                  sx={{ background: "#FAE078", color: "black" }}
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  key={image}
                >
                  Upload file
                  <VisuallyHiddenInput
                    name="recipeImage"
                    type="file"
                    onChange={handleImage}
                  />
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, mb: 2, background: "#FAE078", color: "black" }}
                >
                  Ajouter !
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </section>
    </>
  );
}
