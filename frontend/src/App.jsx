import NavBar from "./components/NavBar";
import "./styles/index.css";

function App() {
  const handleSubmit = () => {
    console.log("Clicked submit.");
  };
  return (
    <>
      <NavBar />
      <h1>Wellness Journal</h1>
      <form action="">
        <textarea
          rows={5}
          cols={30}
          placeholder="Your thoughts..."
          name="note"
          id="note"
        ></textarea>
        <button type="submit" onSubmit={handleSubmit}>
          Save Note
        </button>
      </form>
    </>
  );
}

export default App;
