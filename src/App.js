import React from 'react';
import './App.css';
import Home from './cliente/compras_sem_licitacao/index.js';

function App() {
    return ( 
        <Home />
    );
}

export default App;


// import React, {Component} from 'react';
// import './App.css';
// import axios from 'axios'

// class App extends Component {
//   state = {
//     response: []
//   };

//   componentDidMount() {
//     this.callApi()
//       .then(res => 
//         console.log('teste')
//         this.setState({response: res.express }))
//       .catch(err => console.log(err));
//   }

//   callApi = async () => {
//     const response = await fetch('/api/mensagem');
//     debugger
//     const body = await response.json();
//     if (response.status !== 200) throw Error(body.message);

//     return body.rows[0];
//   };

//   render() {
//     return (
//       <div className="App">
//         <p className="App-intro">{this.state.response}</p>
//       </div>
//     );
//   }
// }

// export default App;