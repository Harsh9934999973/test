import React from 'react';
import { Link } from 'react-router-dom';

function Sidenav({clickHandler}) {
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
    <div className="sb-sidenav-menu">
        <div className="nav">
            <div className="sb-sidenav-menu-heading"><span className='white'>Home</span></div>
            <Link className="nav-link" to='/dashboard/main'>
                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                <span className='white'>Dashboard</span>
            </Link>
            {/* <Link className="nav-link" to='/dashboard/register'>
                <div className="sb-nav-link-icon" ><i className="fas fa-tachometer-alt"></i></div>
                <span className='white'>Register</span>
            </Link>
            <Link className="nav-link" to='/dashboard/users'>
                <div className="sb-nav-link-icon" ><i className="fas fa-tachometer-alt"></i></div>
                <span className='white'>Users</span>
            </Link>
            <Link className="nav-link" to='/dashboard/setting'>
                <div className="sb-nav-link-icon" ><i className="fas fa-tachometer-alt"></i></div>
                <span className='white'>Settings</span>
            </Link> */}
            <div className="sb-sidenav-menu-heading"><span className='white'>CATEGORY & SUBCATEGORY</span></div>
            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseReport" aria-expanded="false" aria-controls="collapseReport">
                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                <span className='white'>CATEGORY</span>
                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </a>
            <div className="collapse" id="collapseReport" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to='/dashboard/createcategory'>
                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                <span className='white'>Create Category</span>
                </Link>
                <Link className="nav-link" to='/dashboard/departments'>
                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                <span className='white'>Manage Category</span>
                </Link>
                </nav>
            </div>
            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseSubcategory" aria-expanded="false" aria-controls="collapseSubcategory">
                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                <span className='white'>SUBCATEGORY</span>
                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </a>
            <div className="collapse" id="collapseSubcategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to='/dashboard/reportsocialcategory'>
                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                <span className='white'>Create Sub-Category</span>
                </Link>
                <Link className="nav-link" to='/dashboard/departments'>
                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                <span className='white'>Manage Sub-Category</span>
                </Link>
                </nav>
            </div>
            {/*<div className="sb-sidenav-menu-heading"><span className='white'>Outcome Budget 2024-25</span></div>
            <Link className="nav-link" to='/dashboard/divisionmigrationsummary'>
            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
            <span className='white'>Summary</span>
            </Link>
            <Link className="nav-link" to='/dashboard/migrationdepartments'>
            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
            <span className='white'>Schemes Report</span>
            </Link>
            <Link className="nav-link" to='/dashboard/migrationdivisionreportdownload'>
            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
            <span className='white'>Directorate Report Download</span>
            </Link>
            <Link className="nav-link" to='/dashboard/divisionmigrationinternal'>
            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
            <span className='white'>Directorate Internal Scheme</span>
            </Link>
            <Link className="nav-link" to='/dashboard/migrationdivisionextrascheme'>
            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
            <span className='white'>Directorate Internal Extra Scheme</span>
            </Link>
            <Link className="nav-link" to='/dashboard/migrationdivisionextrasubscheme'>
            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
            <span className='white'>Directorate Internal Extra Sub-Scheme</span>
            </Link>
            <Link className="nav-link" to='/dashboard/divisionpendingschemedept'>
            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
            <span className='white'>Directorate Pending Scheme</span>
            </Link>
            <Link className="nav-link" to='/dashboard/divisionpendingsubschemedept'>
            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
            <span className='white'>Directorate Pending Sub-Scheme</span>
            </Link> */}
            
            {/* <Link className="nav-link" to='/dashboard/departmentdata'>
                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                <span className='white'>Department Data</span>
            </Link> */}
        </div>
    </div>
    <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        Admin
    </div>
</nav>)}

export default Sidenav;
