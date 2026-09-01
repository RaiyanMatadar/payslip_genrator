import { Toaster } from "react-hot-toast";
import Login from "./components/login";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Login />
    </>
  );
}

export default App;