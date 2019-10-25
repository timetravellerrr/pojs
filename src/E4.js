import React, { Component } from 'react';

class E4 extends Component {

    render() {
  
      return (
        <div className="container">
          <div className="col-md-12">
            <h1>My Todos</h1>
            {this.state.todos.map((todo) => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{todo.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {todo.completed &&
                      <span>
                        Completed
                      </span>
                    }
                    {!todo.completed &&
                      <span>
                        Pending
                      </span>
                    }
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    state = {
      todos: []
    }
  
    componentDidMount() {
      fetch('http://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then((jsonData) => {
          // jsonData is parsed json object received from url
          this.setState({ todos: jsonData })
          console.log(jsonData)
        })
        .catch((error) => {
          // handle your errors here
          console.error(error)
        })
    }
  }
  
  export default E4;