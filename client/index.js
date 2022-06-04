import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    const users = (await axios.get('/api/users')).data;
    this.setState({ users });
  }
  
  render() {
    return (
      <div>
        <ul>
          {this.state.users.map((user) => (
            <li>{user.firstName}</li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
export default App;
