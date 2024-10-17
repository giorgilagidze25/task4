import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('white');
  const [showTitle, setShowTitle] = useState(true);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const darkLightThemeToggle = () => {
    const newColor = color === 'white' ? 'red' : 'white';
    document.body.style.backgroundColor = newColor;
    setColor(newColor);
  };

  const toggleTitle = () => {
    setShowTitle(!showTitle);
  };

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const deleteTodo = (index) => {
    const confirmDelete = window.confirm("გინდა ნამდვილად წაშალო todo ?");
    if (confirmDelete) {
      const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
      setTodos(newTodos);
    }
  };

  const toggleTodoCompletion = (index) => {
    const newTodos = todos.map((todo, todoIndex) => {
      if (todoIndex === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div>
      {/* ///////////////////////////////// */}
      <div>
        <input 
         className='input'
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyPress={handleKeyPress}
          placeholder="Add a new task" 
        />
        <button className='inputBtn' onClick={addTodo}>Add Todo</button>
      </div>

     

      <ul>
        {todos.map((todo, index) => (
          <li  key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
            <button className='complateBtn' onClick={() => toggleTodoCompletion(index)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button className='Delete' onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <button className='LightRedModi' onClick={darkLightThemeToggle}>Light/red </button>


         {/* ///////////////  */}
      <div className='Card'>
        {showTitle && <h1>Title: parrots</h1>}
        <img src="/assets/parrots.jpg" alt="Parrots" width={200} />
        <p>desc: Lorem ipsum dolor sit.</p>

        <button onClick={toggleTitle} className='DeleteTitleBtn'>
          {showTitle ? 'Delete title' : 'Show title'}
        </button>
      </div>


       {/* ////////////////// */}

      <h1 className='count'>{count}</h1>
      <button className='increment' onClick={increment}>+</button>
      <button className='decrement' onClick={decrement}>-</button>
    </div>
  );
}

export default App;
