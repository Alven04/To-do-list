import { useEffect, useState } from "react";
const App = () => {
  const [newItem, setNewItem] = useState("");
  const [ticked, setTicked] = useState(false);
  const [toDos, setToDos] = useState(() => {
    const toDosInLocalStorageString = localStorage.getItem("toDos");
    if (toDosInLocalStorageString == null) {
      return [];
    }
    return JSON.parse(toDosInLocalStorageString);
  });
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);
  function clearNewItem() {
    setNewItem("");
  }

  // function addNewToDo
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const temp = [{ id: crypto.randomUUID(), message: newItem }];
          setToDos(() => {
            const newToDos = toDos.concat(temp);
            return newToDos;
          });
          clearNewItem();
        }}
      >
        <label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
          />
        </label>
        <button type="submit">Add</button>
        <button
          type="button"
          onClick={() => {
            setToDos([]);
            localStorage.removeItem("toDos");
          }}
        >
          Clear Storage
        </button>
      </form>
      <h1>To Do List</h1>

      {toDos.map((toDo) => (
        <div key={toDo.id}>
          <input
            type="checkbox"
            onClick={() => {
              const newToDos = toDos.filter(
                (currentToDo) => currentToDo.id !== toDo.id
              );
              setToDos(newToDos);
              localStorage.setItem("toDos", newToDos);
            }}
          />
          <p>{toDo.message}</p>
          <button
            type="button"
            onClick={() => {
              const newToDos = toDos.filter(
                (currentToDo) => currentToDo.id !== toDo.id
              );
              setToDos(newToDos);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default App;
