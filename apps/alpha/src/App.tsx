import { useEffect, useState } from 'react';

function App() {
  const [apiResult, setApiResult] = useState<string>('');

  const callBtn = async () => {
    const res = await fetch('/api');
    const data = await res.text();
    setApiResult(data);
  };

  return (
    <div className='App'>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={callBtn} className='btn btn-small'>
          Hello api!
        </button>
      </div>
      <p className='read-the-docs'>{apiResult}</p>
    </div>
  );
}

export default App;
