import React, { useState } from 'react';
import './App.css';
import { ScrollView } from './scroll-view';

const App: React.FC = () => {
  const [value, setValue] = useState(0)
  const [loading, setLoading] = useState(false)
  const handleScrollBottom = () => {
    setLoading(true)
    setTimeout(() => {
      console.info('load more');
      setValue(prevState => prevState + 1)
      setLoading(false)
    }, 2000);
  };
  return (
    <div className="App">
      <ScrollView style={{ height: 400, overflow: 'auto' }} loading={loading} onScrollBottom={handleScrollBottom}>
        <div style={{ backgroundColor: '#ccc', height: 1000 }}>{value}</div>
      </ScrollView>
    </div>
  );
};

export default App;
