import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";
import "./util/style.css";
import "./util/css/all.css";
import "./util/css/bootstrap.css";
import "./util/css/responsive.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { LOGIN_USER } from "./actions/types";
function App() {
  const token = Cookies.get("w_auth");
  if (token) {
    const decoded_jwtToken = jwt_decode(token);
    store.dispatch({
      type: LOGIN_USER,
      payload: { ...decoded_jwtToken, userLoggedIn: true },
    });
  }
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
