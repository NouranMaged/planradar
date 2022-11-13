import React from "react";
import MainPage from "./pages/mainPage.tsx";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/store.js";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};

export default App;
