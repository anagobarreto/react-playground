import React, { Component } from 'react';
import './App.css';

function getInitialTodos() {
  const todos = localStorage.getItem('todos');
  if (todos) {
    return JSON.parse(todos);
  } else {
    return [];
  }
}

class Todo extends Component {
  render() {
    const {checked, title} = this.props;

    return <p>
      <input type="checkbox" checked={checked}
      onChange={(e) => {
        this.props.updateChecked(e.target.checked);
      }} />

      <input
        type="text"
        value={title}
        onChange={(e) => {
          this.props.updateTitle(e.target.value);
        }}
      />

      <button className="delbtn" onClick={() => {
        this.props.remove();
      }}>X</button>
    </p>;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: getInitialTodos()
    };
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('todos', JSON.stringify(nextState.todos));
  }

  render() {
    const {todos} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2 className="title">Todo list</h2>
        </div>

        {todos.map((todo, i) => {
          return <Todo
            key={i}
            title={todo.title}
            checked={todo.checked}
            updateChecked={(newChecked) => {
              const todos = this.state.todos.slice();
              todos[i] = {
                title: todos[i].title,
                checked: newChecked
              };
              this.setState({todos});
            }}
            updateTitle={(newTitle) => {
              const todos = this.state.todos.slice();
              todos[i] = {
                title: newTitle,
                checked: todos[i].checked
              };
              this.setState({todos});
            }}
            remove={() => {
              const todos = this.state.todos.slice();
              todos.splice(i, 1);
              this.setState({todos});
            }}
          />;
        })}

        <button className="addbtn" onClick={() => {
          const todos = this.state.todos.slice();
          todos.push({
            title: '',
            checked: false,
          });
          this.setState({
            todos
          });
        }}>Add new item</button>
      </div>
    );
  }
}

export default App;
