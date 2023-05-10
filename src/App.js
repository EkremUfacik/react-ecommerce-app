import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";
import Approuter from "./router/AppRouter";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Approuter />
      </PersistGate>
    </Provider>
  );
}

export default App;
