import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import options from '../apti/options.png'
import answer from '../apti/answer.png'
import hints from '../apti/hints.png'
import fiftyfifty from '../apti/fiftyfifty.png'

const AptiInstructions = () => (
    <Fragment>
        <Helmet><title>Instructions</title></Helmet>
        <div className="instructions container">
            <h1>Introduction</h1>
            <ul className="browser-default" id="main-list">
                <li>This is a simulation of a real pre-employment assessment test. This test consists of three sub-tests with a total of 40 questions.</li>
                <li>The time limit of only 5 minutes for each test is fairly demanding, so make sure you work fast, but precisely.</li>
                <li>The test is to be completed without the aid of a calculator. We suggest you have pen and paper ready for your test.</li>
                <li>
                    Every question has 4 options.
                    <img src={options} alt="options example"/>
                </li>
                <li>
                    Select the option which best answers the question by clicking (or selecting) it.
                    <img src={answer} alt="options example"/>
                </li>
                <li>
                    you can use 2 lifelines namely:
                    <ul id="sublist">
                        <li>2 50-50</li>
                        <li>5 hints</li>
                    </ul>
                </li>
                <li>
                    Selecting a 50-50 lifeline by clicking the icon
                    <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
                    will remove 2 wrong answers, leaving the crt and 1 wrong answer.
                    <img src={fiftyfifty} alt="fiftyfifty example"/>
                </li>
                <li>
                    Using a hint by clicking the icon
                    <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
                    will remove one wrong answer leaving two wrong answers and one correct answer. You can use as many hints as possible on a single question.
                    <img src={hints} alt="hints example"/>
                </li>
                <li>Feel free to quit (or retire from) the game at any time. In that case your score will be revealed afterwards.</li>
                <li>The timer starts as soon as the game loads.</li>
                <li>Let's do this if you think you've got what it takes?</li>
            </ul>
            <div>
                <span className="left"><Link to="/">No take me back</Link></span>
                <span className="right"><Link to="/play/apti">Okay,lets do this</Link></span>
            </div>
        </div>
    </Fragment>
);

export default AptiInstructions;