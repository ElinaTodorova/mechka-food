import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function AdminUserCard({
  userid,
  username,
  firstname,
  lastname,
  email,
  role,
}) {
  const handelDeleteUser = (id) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => console.info(data));
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      window.location.reload();
    }
  };

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 5, boxShadow: 5 }}>
      <Button
        sx={{ margin: 3 }}
        variant="outlined"
        onClick={() => {
          handelDeleteUser(userid);
        }}
      >
        Supprimer
      </Button>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Username: {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Firstname: {firstname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lastname: {lastname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {role}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

AdminUserCard.propTypes = {
  userid: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired,
};
