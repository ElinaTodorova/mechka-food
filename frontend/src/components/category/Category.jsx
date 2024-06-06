import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "./Category.module.css";

export default function Category() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category`)
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <section className={styles.globalContainer}>
      {categories &&
        categories.map((categorie) => (
          <Card key={categorie.id}>
            <CardActionArea className={styles.categoryCard}>
              <Link to={`/recipes/category/${categorie.id}`}>
                <CardMedia
                  component="img"
                  image={categorie.image_url}
                  alt={categorie.name}
                  className={styles.categoryImage}
                />
              </Link>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className={styles.categoryTitle}
                >
                  {categorie.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </section>
  );
}
