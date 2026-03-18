import { ToastContainer, toast } from "react-toastify";

function App() {
  const notify = () => toast("Hello, this is a toast!");

  return (
    <div>
      <button onClick={notify}>Show Toast</button>
      <ToastContainer />
    </div>
  );
}

export default App;
