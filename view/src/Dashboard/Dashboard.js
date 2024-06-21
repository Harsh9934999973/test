import React,{useState,useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidenav from './Sidenav';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import {errorActions} from '../store/errorSlice';


const Dashboard = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const isSignedIn = useSelector((state) => state.user.isSignedIn);
    const role = useSelector((state) => state.user.role);
    const error = useSelector((state) => state.error.error);

    const [showSide, setShowSide] = useState(false)

    const clickHandler = () => {
        setShowSide(!showSide)
     }

     useEffect(() => {
        if(isSignedIn !== true){
            return navigate(`/`);
        }  
        if(role !== 'admin'){
            return navigate(`/`);
        }
   }, [isSignedIn]);

   useEffect(() => {
    if(error){
        return navigate(`/errorpage`);
    }  
    return () => {
        dispatch(errorActions.setError({error:false}))
    }
}, [error]);

    return (
        <div style={{backgroundColor: '#fff'}} className={`sb-nav-fixed ${showSide && 'sb-sidenav-toggled'}`}>
        <Navbar clickHandler={clickHandler}/>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
            <Sidenav clickHandler={clickHandler}/>
            </div>
            <div id="layoutSidenav_content">
                <Outlet />
                <Footer />
            </div>
        </div>
        </div>
    );
}

export default Dashboard;