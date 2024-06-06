import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import AdminUserCard from "./AdminUserCard";
import styles from "./AdminUserPage.module.css";

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUsers(data));
  });
  return (
    <section>
      <div className={styles.containerTitle}>
        <Typography
          variant="h4"
          component="h5"
          sx={{
            backgroundColor: "#ffc107",
            borderRadius: "5px",
            width: "20rem",
            color: "whitesmoke",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Toutes les users
        </Typography>
      </div>
      <div className={styles.cardPosition}>
        {users.map((user) => (
          <AdminUserCard
            key={user.id}
            id={user.id}
            username={user.username}
            firstname={user.firstname}
            lastname={user.lastname}
            email={user.email}
            role={user.role_id}
            userid={user.id}
          />
        ))}
      </div>
    </section>
  );
}
