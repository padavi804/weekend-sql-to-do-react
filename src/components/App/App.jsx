import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from '../Header/Header'

function App() {

  let [todoNote, setTodoNote] = useState('');
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
      .catch((error) => {
        console.log('error fetching list', error);
      });
  }
  useEffect(fetchList, []);

  const addTodo = (event) => {
    event.preventDefault();
    console.log(`The new task ${todoNote} is being added`)

    axios({
      method: 'POST',
      url: '/api/todo',
      data: {
        note: todoNote,
        complete: todoComplete
      }
    })
      .then((response) => {
        console.log('successful post', response);
        fetchList();
        setTodoNote('');
        setTodoComplete('');
      })
      .catch((error) => {
        console.log('post failed', error)
      })
  };

  const deleteTodo = (id) => {
    axios({
      method: 'DELETE',
      url: `/api/todo/${id}`
    })
      .then((response) => {
        console.log('delete task worked', response)
        fetchList();
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const toggleComplete = (id) => {
    console.log('completely toggling completeness', id);

    axios({
      method: 'PUT',
      url: `/api/todo/toggle/${id}`
    })
      .then((response) => {
        console.log('complete toggle successful', response);
        fetchList();
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div>
      <Header />


      <section className="new-task">
        <form onSubmit={addTodo}>
          <input id="name-input" placeholder="New Task" onChange={(evt) => setTodoNote(evt.target.value)} value={todoNote} />
          <input id="complete-input" placeholder="Complete?" onChange={(evt) => setTodoComplete(evt.target.value)} value={todoComplete} />
          <button className="submitButton" type="submit">Add to list</button>
        </form>
      </section>
    
      <h2>Current List</h2>
      <table>
      <thead>
            <tr>
              <th className='noteTh'>Note</th>
              <th className='completeTh'>Mark Complete</th>
              <th className='deleteTh'>Remove</th>
            </tr>
          </thead>
      <tbody>
        {todoArray.map((todo) => { return (
        <tr key={todo.note} className={todo.complete ? 'true' : 'false'}>
          <td>{todo.note} {todo.complete} </td>
          <td><button className="doneButton" onClick={() => toggleComplete(todo.id)}> Complete </button> </td>
          <td><button className="deleteButton" onClick={() => deleteTodo(todo.id)}>Remove</button></td></tr>);
        })}
      </tbody>
      </table>
    </div>
  );


}

export default App
