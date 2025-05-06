import "./App.css";

function App() {
  return (
    <>
      <h1>Wellness Journal</h1>

      <form action="">
        <textarea
          rows={5}
          cols={3}
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
