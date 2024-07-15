import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import UserList from "./components/Users/UserList/UserList";
import UserDetail from "./components/Users/UserDetail/UserDetail";
import Logout from "./components/Auth/Logout/Logout";
import PrivateRoute from "./components/Auth/PrivateRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/logout'
            element={<Logout />}
          />
          <Route element={<PrivateRoute />}>
            <Route
              path='/users/:id'
              element={<UserDetail />}
            />
            <Route
              path='/users'
              element={<UserList />}
            />
          </Route>
          <Route
            path='/'
            element={<Navigate to='/login' />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
