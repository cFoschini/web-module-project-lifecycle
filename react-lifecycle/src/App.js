import React from 'react';
import axios from 'axios';
import './App.css';


const fetchData = (login) => {
  return axios.get(`https://api.github.com/users/${login}/followers_url`)
    .then(res => res)
    .catch(err => console.log(err))
}


class App extends React.Component {
  state = {
    login: '',
    currentLogin: 'artofmayhem',
    followers_url: ''
  }

  componentDidMount() {
    fetchData(this.state.currentLogin)
      .then(res => {
        this.setState({
          followers_url: res.data.message
        })
      }
      )
  }

  handleChange = (e) => {
    this.setState({
      login: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetchData(this.state.login)
      .then(res => {
        this.setState({
          followers_url: res.data.message
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>Search Followers</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" />
          <button>Search</button>
        </form>
        <h2>Followers:</h2>
        {this.state.followers_url.map((item) => { <li> item.followers_url</li> })
        }
      </div >
    );
  }
}

export default App;
