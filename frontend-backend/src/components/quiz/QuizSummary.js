import React, { Component, Fragment } from 'react';
//import ReactDom from 'react-dom';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { sendData } from '../UserFunctions';
import {Doughnut,Bar} from 'react-chartjs-2';

var barstate = {
    labels: ['Score','Number Of Questions','Number Of Answered Questions','Correct Answers','Wrong Answers','Hints Used','Fifty Fifty Used'],
    datasets: [
      {
        label: 'Current Test',
        backgroundColor: ['red','blue','green','yellow','white','orange','black'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        //data: [this.state.score,this.state.numberOfQuestions,this.state.numberOfAnsweredQuestions,this.state.correctAnswers,this.state.wrongAnswers,this.state.hintsUsed,this.state.fiftyFiftyUsed]
        data:[4,150,22,6,16,1,1]
      }
    ]
}

var piestate = {
    labels: ['Correct','Wrong','Not Tried'],
    datasets: [
        {
          
          backgroundColor: ['red','blue','green'],
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          //data: [this.state.score,this.state.numberOfQuestions,this.state.numberOfAnsweredQuestions,this.state.correctAnswers,this.state.wrongAnswers,this.state.hintsUsed,this.state.fiftyFiftyUsed]
          data:[6,16,128]
        }
      ]
  }
  var mixedbarstate = {
    labels: ['Score','Number Of Questions','Number Of Answered Questions','Correct Answers','Wrong Answers','Hints Used','Fifty Fifty Used'],
    datasets: [
      {
        label: 'Test 1',
        backgroundColor: ['violet','violet','violet','violet','violet','violet','violet'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        //data: [this.state.score,this.state.numberOfQuestions,this.state.numberOfAnsweredQuestions,this.state.correctAnswers,this.state.wrongAnswers,this.state.hintsUsed,this.state.fiftyFiftyUsed]
        data:[4,150,22,6,16,1,1]
      },
      {
        label: 'Test 2',
        backgroundColor: ['indigo','indigo','indigo','indigo','indigo','indigo','indigo'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        //data: [this.state.score,this.state.numberOfQuestions,this.state.numberOfAnsweredQuestions,this.state.correctAnswers,this.state.wrongAnswers,this.state.hintsUsed,this.state.fiftyFiftyUsed]
        data:[60,200,130,120,5,0,5]
      }

    ]
}

class QuizSummary extends Component {
    constructor (props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hintsUsed: 0,
            fiftyFiftyUsed: 0
            /*correct : [
                { '1': 0 },
                { '2': 0 },
                { '3': 0 },
                { '4': 0 },
                { '5': 0 },

                <div>
                             {this.state.correct.map((item, index) => (
                            <li >item:index</li>
                            ))}
                        </div>

              ]*/
        };
        this.totalstate = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hintsUsed: 0,
            fiftyFiftyUsed: 0
        }
        this.chart= {
            labels:['score','numberOfQuestions','numberOfAnsweredQuestions','correctAnswers','wrongAnswers','hintsUsed','fiftyFiftyUsed'],
            datasets:[{
                label: 'Result',
                data:[],
                backgroundColor:['red','blue','green','yellow','white','orange','black']
            }]
        }
        //let barChart;
        this.newLabels = ["Label1", "Label2", "Label3"];
        this.newData = ["Data1", "Data2", "Data3"];
        
        

            
    }
    updateBarstate ()  {console.log(barstate.datasets.data)}


    componentDidMount () {
        console.log(this.props)
        const { state } = this.props.location;
        console.log(state);
        console.log("hello");
        //const token = localStorage.getItem('usertoken');
        
        if (state) {
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                hintsUsed: state.hintsUsed,
                fiftyFiftyUsed: state.fiftyFiftyUsed,
                //correct:state.correct
            });

        }
        sendData(this.state).then(res => {
            if (!res.error) {
              //this.totalstate = res;
              //barstate.datasets.data = [res.score,res.numberOfQuestions,res.numberOfAnsweredQuestions,res.correctAnswers,res.wrongAnswers,res.hintsUsed,res.fiftyFiftyUsed]
              this.updateBarstate()
              

            }
          })
          
    }


/*createBarChart = (labels, data) => {

    let ctx = "bar_l1_chart";
    //let barChart;
    barChart = new Bar(ctx, {
        type: 'horizontalBar',
        data: {
            labels: [labels],
            datasets: [{
                label: 'Sentiment',
                data: [data],
            }]
        },
    });
};*/


    render () {
        const { state } = this.props.location;
        let stats, remark;
        const userScore = this.state.score;

        if (userScore <= 30 ) {
            remark = 'You need more practice!';
        } else if (userScore > 30 && userScore <= 50) {
            remark = 'Better luck next time!';
        } else if (userScore <= 70 && userScore > 50) {
            remark = 'You can do better!';
        } else if (userScore >= 71 && userScore <= 84) {
            remark = 'You did great!';
        } else {
            remark = 'You\'re an absolute genius!';
        }

        if (state !== undefined) {
            stats = (
                <Fragment>
                    <div style={{ textAlign: 'center' }}>
                        <span className="mdi mdi-check-circle-outline success-icon"></span>
                    </div>
                    <h1>Quiz has ended</h1>
                    <div className="container stats">
                        <h4>{remark}</h4>
                        <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total number of questions: </span>
                        <span className="right">{this.state.numberOfQuestions}</span><br />

                        <span className="stat left">Number of attempted questions: </span>
                        <span className="right">{this.state.numberOfAnsweredQuestions}</span><br />

                        <span className="stat left">Number of Correct Answers: </span>
                        <span className="right">{this.state.correctAnswers}</span> <br />

                        <span className="stat left">Number of Wrong Answers: </span>
                        <span className="right">{this.state.wrongAnswers}</span><br />

                        <span className="stat left">Hints Used: </span>
                        <span className="right">{this.state.hintsUsed}</span><br />

                        <span className="stat left">50-50 Used: </span>
                        <span className="right">{this.state.fiftyFiftyUsed}</span><br />
                        <div>
                        <br/>
                        <h1>Quiz Breakdown Chart</h1>
                        <div><Bar
                                data={barstate}
                                options={{
                                    title:{
                                    display:true,
                                    text:'Your Test Analysis',
                                    fontSize:20
                                    },
                                    legend:{
                                    display:true,
                                    position:'right'
                                    }
                                }}
                        /></div>
                        <div>
                            <Doughnut
                            data={piestate}
                            options={{
                                title:{
                                display:true,
                                text:'Question Wise Analysis',
                                fontSize:20
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}/>

                        </div>
                        <div>
                            <Bar
                            data={mixedbarstate}
                            options={{
                                title:{
                                display:true,
                                text:'Comparative Analysis',
                                fontSize:20
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}/>

                        </div>
                        
                            <br />
                    </div>
                        
                        
                        
                    </div>
                    <section>
                        <ul>
                            <li>
                                <Link to ="/play/quiz">Play Again</Link>
                            </li>
                            <li>
                                <Link to ="/">Back to Home</Link>
                            </li>
                        </ul>
                    </section>
                    
                </Fragment>
                
            );
        } else {
            stats = (
                <section>
                    <h1 className="no-stats">No Statistics Available</h1>
                    <ul>
                        <li>
                            <Link to ="/play/quiz">Take a Quiz</Link>
                        </li>
                        <li>
                            <Link to ="/">Back to Home</Link>
                        </li>
                    </ul>
                </section>
            );
        }
        return (
            <Fragment>
                <Helmet><title>Quiz App - Summary</title></Helmet>
                <div className="quiz-summary">
                    {stats}
                </div>
            </Fragment>
            
            
            // ReactDOM.render goes here:
            //ReactDOM.render(<ul>{peopleLis()}</ul>, document.getElementById("app"));
        );
    }
}

export default QuizSummary;