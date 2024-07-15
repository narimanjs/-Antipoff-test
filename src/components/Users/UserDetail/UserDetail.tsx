// src/components/Users/UserDetail.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUser } from "../../../redux/actions/userActions";
import styles from "./UserDetail.module.css";
import { RootState } from "../../../redux/store";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.users.user);
  const loading = useAppSelector((state: RootState) => state.users.loading);
  const error = useAppSelector((state: RootState) => state.users.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(Number(id)));
    }
  }, [dispatch, id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/users");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          onClick={handleBack}
          className={styles.backButton}
        >
          Назад
        </button>
        <div className={styles.userDetails}>
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <h1 className={styles.name}>
            {user.first_name} {user.last_name}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Выход
        </button>
      </header>
      <div className={styles.details}>
        <div className={styles.description}>
          <p>
            Клиенты видят в нем эксперта по вопросам разработки комплексных
            решений финансовых продуктов, включая такие аспекты, как
            организационная структура, процессы, аналитика и ИТ-компоненты...
          </p>
        </div>
        <div className={styles.contactInfo}>
          <p>
            <svg>...phone icon...</svg> {user.phone}
          </p>
          <p>
            <svg>...email icon...</svg> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
