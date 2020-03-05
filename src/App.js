import React from 'react';
import { Routes } from './components/routes/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider, connect } from 'react-redux';
import initStore from './redux/store';


const Container = connect()(Routes);


function App() {
  return (
    <Provider store={initStore()}>
    <div className="App">
      <Container/>
    </div>
    </Provider>
  );
}

export default App;
