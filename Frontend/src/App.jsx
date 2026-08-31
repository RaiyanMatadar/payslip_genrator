import { Toaster } from "react-hot-toast";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Login />
    </>
  );
}

export default App;