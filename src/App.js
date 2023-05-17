import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";
import Approuter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Approuter />
      </PersistGate>
      <ToastContainer />
    </Provider>
  );
}

export default App;
