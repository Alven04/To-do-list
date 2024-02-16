import React, { useState } from "react";

const Edit = ({ props }) => {
  const [editWord, setEditWord] = useState();
  const { isEdit, setIsEdit, toDos, setToDos, toDo } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEdit(false);
    setToDos((prevState) =>
      prevState.map((item) => {
        if (item.id === toDo.id) {
          return { id: item.id, message: editWord };
        }
        return item;
      })
    );
  };
  return (
    <div>
      <form onSubmit={handleSubmit}></form>

      <input type={"text"} onChange={(e) => setEditWord(e.target.value)} />
      <button onClick={handleSubmit} type="submit">
        Confirm
      </button>
    </div>
  );
};

export default Edit;
