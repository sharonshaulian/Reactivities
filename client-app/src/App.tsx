import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import { cars } from './demo'
import CarItem from './CarItem';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';


class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    
    axios.get('https://localhost:5001/api/values').then((res)=>{
        
        this.setState( {values: res.data } );
      }
    )
    
    
    

  }

  render () {

    let valueNames = this.state.values.map((value: any) => {
        return value.name;
    });

    return (
      <div>

        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List items={valueNames} />

      </div>
    );

  };
}




// function App() {
//   return (
//     <div className="App">
//         <li>
//           {cars.map((car) => (
//               <CarItem car={car} />
//             ))}
//         </li>          
//     </div>
//   );
// }

export default App;
