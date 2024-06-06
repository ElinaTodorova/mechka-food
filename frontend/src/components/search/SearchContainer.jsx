import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./SearchContainer.module.css";
import FoundRecipeCard from "./FoundRecipeCard";
import pictureError from "../../assets/images/notFound-removebg-preview.png";
import Category from "../category/Category";

export default function SearcContainer() {
  const MAX_LENGTH = 50;

  const [value, setValue] = useState("");
  const [recipes, setRecipe] = useState(null);
  const [found, setFound] = useState(null);
  const [isFound, setIsFound] = useState(true);

  const handleChange = (e) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setValue(e.target.value);
    }
  };

  const maxReached = value.length >= MAX_LENGTH;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipes`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, []);

  const strNoAccent = (a) => {
    return a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = () => {
    if (recipes) {
      const result = recipes.filter((recipe) =>
        strNoAccent(recipe.title).toLowerCase().includes(value.toLowerCase())
      );
      setFound(result);

      if (result.length > 0) {
        setIsFound(true);
      } else {
        setIsFound(false);
      }
    }
  };

  return (
    <section className={style.globalContainer}>
      <div className={style.container}>
        <input
          className={style.input}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <div className={style.button}>
          <svg
            onClick={handleSearch}
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>
      </div>
      {maxReached ? <p className={style.warning}>Trop long</p> : ""}
      <div className={style.containerFlex}>
        {isFound === true ? (
          found &&
          found.map((res) => {
            return (
              <Link to={`/recipes/${res.id}`} key={res.id}>
                <FoundRecipeCard image={res.image_url} title={res.title} />
              </Link>
            );
          })
        ) : (
          <img className={style.error_img} src={pictureError} alt="Error" />
        )}
      </div>
      {found !== null || isFound === false ? null : <Category />}
    </section>
  );
}
