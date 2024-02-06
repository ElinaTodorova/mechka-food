import RecipesCarrousel from "../../components/recipesCarrouselHome/RecipesCarrousel";
import RecipeContainer from "../../components/recipesHome/RecipeContainer";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className="Home">
      <Header />
      <Sidebar />
      <Navbar />
      <div className={styles.dualCaroussel}>
        <RecipesCarrousel />
        <RecipesCarrousel />
      </div>
      <RecipeContainer />
    </div>
  );
}

export default Home;
