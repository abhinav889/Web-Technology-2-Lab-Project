import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


const Home = () => (
    <Fragment>
        <Helmet><title>Apti-test</title></Helmet>
        <div id="home">
            
            <section>
                <div style={{textAlign:'center'}}>
                    <span className="mdi  mdi-nfc-tap cube"></span>
                </div>
                <h1>Apti</h1>
                <div className="ask-container">
                    <p className="fp">wanna rock?connect wit us</p>
                    <div className="auth-container">
                        <Link className="auth-buttons" id="login-button" to="/login">Login</Link>
                        <Link className="auth-buttons" id="signup-button" to="/signup">Sign up</Link>
                    </div>
                </div>
                <div className="play-button-container">
                    <ul>
                        <li><Link  className="play-button" to="/play/instructions">Take a Test</Link></li>
                    </ul>
                </div>
            </section>
        </div>
    </Fragment>
        
    );

export default Home;