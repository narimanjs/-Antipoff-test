import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { performLogout } from "../../../redux/actions/authActions";
import styles from "./Logout.module.css";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(performLogout());
    localStorage.removeItem("token"); // Remove token
    navigate("/login");
  }, [dispatch, navigate]);

  return (
    <div className={styles.container}>
      <p className={styles.message}>Logging out...</p>
      <button
        onClick={() => navigate("/login")}
        className={styles.backButton}
      >
        Back to Login
      </button>
    </div>
  );
};

export default Logout;
