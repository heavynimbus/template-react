import {FunctionComponent} from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './views/home/Home';
import Counter from './views/counter/Counter';
import Navbar from './components/navbar/Navbar';

const App: FunctionComponent = () => {

  return <div className="App">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/counter" element={<Counter/>}/>
    </Routes>
  </div>;
};

export default App;
