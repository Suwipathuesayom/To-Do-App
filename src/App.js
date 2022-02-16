import { useState, useEffect } from "react";
import "./App.css";
import { Button, Navbar, Container } from 'react-bootstrap';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });


  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log("Current Todo", currentTodo);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }
    setTodo("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(removeItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  function handleUpdateTodo(id, updatedTodo) {

    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditing(false);
    setTodos(updatedItem);

  }


  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo)
  }

  console.log(todos);

  return (
    <div className="App">
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#">To Do App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <div className="form mt-5">
          {isEditing ? (
            <form onSubmit={handleEditFormSubmit}>
              <h1>Edit Todo</h1>
              {" "}
              <input
                type="text"
                name="editTodo"
                placeholder="Edit todo"
                value={currentTodo.text}
                onChange={handleEditInputChange}
              />

              <Button variant="success" type="submit">Update</Button>
              <Button variant="primary" type="submit" onClick={() => setIsEditing(false)}>Cancel</Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="todo"
                placeholder="Create a new todo"
                value={todo}
                onChange={handleInputChange}
              />
              <Button variant="success" type="submit">Add</Button>
            </form>
          )}
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.text}{" "}
                <Button variant="warning" type="submit" onClick={() => handleEditClick(todo)}>Edit</Button>
                <Button variant="danger" type="submit" onClick={() => handleDeleteClick(todo.id)}>Delete</Button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default App;
