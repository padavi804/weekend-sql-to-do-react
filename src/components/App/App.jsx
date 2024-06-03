import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

let [todoNote, setTodoNote] = useState ('');
let [todoComplete, setTodoComplete] = useState('');
let [todoArray, setTodoArray] = useState([]);

  const fetchList = () => {
    axios({
      method: 'GET',
      url: 'api/todo'
    })
      .then((response) => {
        console.log(response.data);
        setTodoArray(response.data);
      })
      .catch((error) =>{
        console.log('error fetching list', error);
      });
  }
  useEffect(fetchList, []);

  return (
    <div>
      <h1>TO DO APP</h1>


      <section className="new-task">
        <form>
        <input id="name-input" placeholder="New Task"/>
        <input type="checkbox" id="complete" />
        <button type="submit">Add to list</button>
        </form>
      </section>

      <h2>Current List</h2>
      <ul>
        {todoArray.map((todo) => { return(<li key={todo.note}>{todo.note} {todo.complete}</li>)})}
      </ul>
    </div>
  );


}

export default App
