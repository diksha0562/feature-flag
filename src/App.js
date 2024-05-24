import {DataContext} from './contextInfo';
import { useState } from 'react';
import DummyComp from './dummyComponent';


function App() {

const [featuresData, setFeaturesData] = useState({})
  return (
    <div className="App">
       <DataContext.Provider value={[featuresData, setFeaturesData]}>
     <DummyComp/>
     </DataContext.Provider>
    </div>
  );
}

export default App;
