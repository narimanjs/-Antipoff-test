import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUsers } from "../../../redux/actions/userActions";
import { resetUsers } from "../../../redux/reducers/userReducer";
import { Link } from "react-router-dom";
import styles from "./UserList.module.css";
import { User } from "../../../types";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(prev => !prev);
  };

  return (
    <div className={styles.userCard}>
      <Link
        to={`/users/${user.id}`}
        className={styles.userLink}
      >
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className={styles.avatar}
        />
        <h2 className={styles.userName}>
          {user.first_name} {user.last_name}
        </h2>
      </Link>
      <button
        className={
          isFavorited ? styles.favoriteButtonActive : styles.favoriteButton
        }
        onClick={toggleFavorite}
      >
        ❤
      </button>
    </div>
  );
};

const UserList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading, error, currentPage } = useAppSelector(
    state => state.users
  );

  useEffect(() => {
    dispatch(resetUsers()); // Reset the users state when the component mounts
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchUsers(currentPage));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading && users.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Наша команда</h1>
        <p>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
          ложатся <br />
          на их плечи, и умеющие находить выход из любых, даже самых сложных
          ситуаций.
        </p>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Выход
        </button>
      </header>
      <div className={styles.userList}>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <button
          onClick={handleLoadMore}
          className={styles.loadMoreButton}
        >
          Показать ещё
        </button>
      )}
    </div>
  );
};

export default UserList;
