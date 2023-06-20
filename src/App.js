

import { nanoid } from "nanoid";
import React, { useState } from "react";

const initTasks = [
  {
    id: nanoid(),
    text: 'поменять резину на машине',
    isActive: false,
    isEdit: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(initTasks);
  const [value, setValue] = useState('');

  function addItem() {
    if (value) {
      let obj = {
        id: nanoid(),
        text: value,
        isActive: false,
        isEdit: false,
      }
      setTasks([...tasks, obj]);
      setValue('');
    }
  }

  function removeItem(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function changeItem(id, event) {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: event.target.value } : task));
  }

  function isEditItem(id) {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEdit: !task.isEdit } : task));
  }

  function isDone(id) {
    setTasks(tasks.map(task => task.id === id ? { ...task, isActive: !task.isActive } : task));
  }

  const result = tasks.map(task => {
    let res;
    if (task.isEdit) {
      res = <input
        autoFocus
        value={task.text}
        onChange={event => changeItem(task.id, event)}
        onBlur={() => isEditItem(task.id)}
      />
    } else {
      res = <span>{task.text}</span>
    }
    return <li className={task.isActive ? 'active cell' : ' cell'} key={task.id}>
      <div className="text">{res}</div>
      <div className="btns">
        <button className="doneBtn" onClick={() => isDone(task.id)}>done</button>
        <button className="editBtn" onClick={() => isEditItem(task.id)}>edit</button>
        <button className="removeBtn" onClick={() => removeItem(task.id)}>remove</button>
      </div>
    </li>
  })

  return <div className="container">
    <div className="cell">
      <input
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder="введите название дела" />
      <button className="addBtn" onClick={addItem}>add</button>
    </div>
    <ul>
      {result}
    </ul>
  </div>
}

export default App;
