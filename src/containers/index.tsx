import {useState}  from 'react';
import { Routes, Route } from 'react-router-dom';

import { AlertProvider } from '../utils/notification/alertcontext';
import Alert from '../utils/notification/alert';

import {Games, Home, NotFound} from '../components/pages/_route';

const IndexRoutes = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 2000);
  // }, [])

  // if (loading) {
  //   return <Onboarding/>
  // }
  
  return (
    <div className={`flex flex-col justify-center items-center w-full overflow-auto h-full`}>
      <AlertProvider>
        <Alert />  
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/games" element={<Games/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </AlertProvider>
    </div>
  )
}

export default IndexRoutes;