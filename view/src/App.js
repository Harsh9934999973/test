import React, {useState, useEffect} from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import './custom.css';
import Loading from './Loading';
import Signin from './Signin';
import ErrorPage from './ErrorPage';
const Dashboard = React.lazy(() => import('./Dashboard/Dashboard'));
const Main = React.lazy(() => import('./Dashboard/Main'));
const CreateCategory = React.lazy(() => import('./Dashboard/CreateCategory'));
const ManageCategories = React.lazy(() => import('./Dashboard/ManageCategories'));


function App() {
  return (
    <React.Suspense fallback={<><Loading/></>}>
      <BrowserRouter basename={""}>
      <Routes>
      <Route path='/' element={<Signin />}/>
      <Route path='/dashboard' element={<Dashboard />}>
              <Route path='main' element={<Main />}/>
              <Route path='createcategory' element={<CreateCategory />}/>
              <Route path='managecategory' element={<ManageCategories />}/>
              </Route>
      <Route path='/errorpage' element={<ErrorPage />} />
      </Routes>
      </BrowserRouter>
      </React.Suspense>
  );
}

export default App;
