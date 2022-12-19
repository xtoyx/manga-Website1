import React, { useEffect } from "react";
import { useNavigate ,Link} from 'react-router-dom'
import useLocalStorage from 'use-local-storage';
import { useState } from 'react'
import '../pages-css/Home.css';
require('dotenv').config();

const Clienturl = process.env.REACT_APP_Local_Server_IP + ":3000/"
function Header({ Infoforheader}){
	const navigate = useNavigate()
	const [WhichIcon,setWhichIcon]=useState(true);
	const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light');
	const [Loginshow,setLoginshow]=useState(false);
	const [Profileshow,setProfileshow]=useState(false);
	const [LogOutshow,setLogOutshow]=useState(false);
	
	const [query, setQuery] = useState("")
	function Greeting() {
		if (Infoforheader.isloggedin &&Infoforheader.profileava&&Infoforheader.firsttime) {
			setProfileshow(true)
			Infoforheader.firsttime = false;
			
		}
		if(Infoforheader.isloggedin&&Infoforheader.logoutava&&!Infoforheader.firsttime){
			setLogOutshow(true)
			Infoforheader.firsttime = true;
			
		}  
		if(!Infoforheader.isloggedin&&Infoforheader.firsttime){
			setLoginshow(true)
			Infoforheader.firsttime = false;
			
		}
		return;
	}
	async function logoutnow(){
		try{
			fetch(process.env.REACT_APP_Local_Server_IP+":5000/auth/logout", {
							method: "POST",
							credentials: "include",
							redirect: 'follow',
					  headers: {
						  Accept: "application/json",
						  "Content-Type": "application/json",
						  "Access-Control-Allow-Credentials": true,
						},
					})
					.then((response) => {
						navigate('/')
						window.location.reload(false);
					});

			fetch(process.env.REACT_APP_Local_Server_IP +":5000/api/logout", {
					method: "POST",
					credentials: "include",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"Access-Control-Allow-Credentials": true,
					},
				})
				.then((response) => {
					navigate('/')
					window.location.reload(false);
					return;
				});	
		}catch (err){
			console.log(err)
		}
	}
	
	function GoToSearchPage(e){
		e.preventDefault();
		navigate('/search/')
		window.location.reload(false);
	}
	setTimeout(
		()=>{
			Greeting()
		},3000)
    return(
 <header className="header">
				<div className="container">
					<div className="row">
						<div className="col-lg-2">
							<div className="header__logo">
							<Link to="">
									{localStorage.getItem('theme') == 'dark' ? 
									<img src="img/logo.png" alt="" /> :
									<img src="img/logo.png" alt="" style={{filter: "invert(100%)",
									WebkitFilter: "invert(100%)" }}/>
									}	
								</Link>
							</div>
						</div>
						<div className="col-lg-8">
							<div className="header__nav">
								<nav className="header__menu mobile-menu">
									<ul>
								
									<li><Link to="/">Homepage</Link></li>
										<li><Link to='/categories'>Categories <span className="arrow_carrot-down"></span></Link>
											<ul className="dropdown">
												<li><Link id='warning' to="/categories">Categories</Link></li>
											<li><Link to="/all_mangas/all">All Mangas</Link></li>
											<li><Link to='/anime'>Anime Watching</Link></li>
											<li><Link to='/blog'>Blog Details</Link></li>
											<li><Link to='/register'>Sign Up</Link></li>
											<li><Link to='/login'>Login</Link></li>
											</ul>
										</li>
										<li><Link to='/blog'>Our Blog</Link></li>
										<li><Link to='/contacts'>Contacts</Link></li>
									</ul>
									
								</nav>
							</div>
						</div>
						<div className="col-lg-2">
							<div className="header__right">
								<a className="search-switch"><span onClick={(e)=>GoToSearchPage(e)}  className="icon_search" style={{cursor: 'pointer'}}></span></a>
								{Profileshow ?  <Link to='/profile'><i className="fas fa-users"></i></Link> : null}
								{LogOutshow ?  <Link onClick={()=>{logoutnow()}} to='/'><i className="fas fa-sign-out-alt"></i></Link>: null}
								{Loginshow &&!(Profileshow &&LogOutshow) ? <Link to='/login'><span className="icon_profile"></span></Link> :null}
							</div>
						</div>
					</div>

					<div id="mobile-menu-wrap"></div>
				</div>
				
			</header> 
				)
            
	}

    export default Header;