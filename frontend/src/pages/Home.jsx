import { useContext, useEffect, useState } from "react";
import journalService from "../services/journalService";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const [journal, setJournal] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);
  useEffect(() => {
    journalService.getJournal(auth, setAuth).then((data) => {
      setJournal(data);
      console.log("HOME RECEIVED: ", data);
    });
  }, [auth, setAuth]);

  const printJournal = () => {
    console.log("Journal for user: ", journal);
  };

  return (
    <div>
      <div>Home</div>
      <button
        className="flex justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cursor-pointer"
        onClick={printJournal}
      >
        Click me for goodies
      </button>
    </div>
  );
};

export default Home;
