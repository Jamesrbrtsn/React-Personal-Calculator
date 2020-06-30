import React from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import UseInput from '../logic/UseInput';

class Calculator extends React.Component{
    
    state = { equation: '', answer: ''};
    
    Clear(){
        this.setState({
            equation: "", 
            answer: "",
            error: false,
        });
    }

    Calculate = () => {
        const [output, cleaned, flag] = UseInput(this.state.equation);
        this.setState({
            answer: output,
            equation: cleaned,
            error: flag
        });
    }

    AddChar(char){
        let v = this.state.equation;
        if(char==="enter" ||char==="="){ 
            if(v.length<=0){ this.setState({answer: ""}); return;}
            this.Calculate(); return; 
        }
        if(char==="c"){ this.Clear(); return; }
        if(char==="backspace"){
            v = v.substring(0,v.length-1);
            this.setState({ 
                equation: v, 
            });
        }
        else{
            let t = char;
            if(t==="shift+0"){t = ")";}
            else if(t==="shift+9"){t = "(";}
            else if(t==="shift+="){t = "+";}
            else if(t==="shift+8"){t = "*";}
            else if(t==="shift+-"){t = "-";}
            else if(t==="shift+6"){t = "^";}
            else if(t==="shift+5"){t = "%";}
            v = v + t;
            this.setState({ equation: v});
        }
    }

    render(){

        const equationErrFlag = this.state.error === true ? 'error' : '';

        return(
            <div>
            <KeyboardEventHandler
                    handleKeys={['numeric','shift+8','-','/',
                        'shift+9','shift+0','shift+=','backspace',
                        'enter','shift+-', 'shift+5', 'shift+6',
                        'c','=','.',"'"]}
                    onKeyEvent={(key)=>{this.AddChar(key)}}
            />
            <div className="calculator ui raised segment">
                <div>    
                    <h1 className="ui header">
                        <i className="calculator icon"/>   
                        <div className="content">
                            Calculator
                        </div>
                    </h1>
                    <div className={`top-row ui action input ${equationErrFlag}`}>
                        <input
                            placeholder="Equation"
                            value={this.state.equation}
                            type="text"
                            readOnly
                        />
                        <button className="ui red button" onClick={()=>this.Clear()}>CLEAR</button>
                    </div>
                    <div className="middle-row">
                        <div className='left-side'>
                            <button className="ui button" onClick={() => this.AddChar('7')}>7</button>
                            <button className="ui button" onClick={() => this.AddChar('8')}>8</button>
                            <button className="ui button" onClick={() => this.AddChar('9')}>9</button>
                            
                            <button className="ui button" onClick={() => this.AddChar('4')}>4</button>
                            <button className="ui button" onClick={() => this.AddChar('5')}>5</button>
                            <button className="ui button" onClick={() => this.AddChar('6')}>6</button>

                            <button className="ui button" onClick={() => this.AddChar('1')}>1</button>
                            <button className="ui button" onClick={() => this.AddChar('2')}>2</button>
                            <button className="ui button" onClick={() => this.AddChar('3')}>3</button>

                            <button className="ui primary button" onClick={()=>this.AddChar("backspace")}>&lt;-</button>
                            <button className="ui button" onClick={() => this.AddChar('0')}>0</button>
                            <button className="ui grey button" onClick={() => this.AddChar('.')}>.</button>
                        </div>
                        <div className='right-side'>
                            <button className="ui grey button" onClick={() => this.AddChar('^')}>^</button>
                            <button className="ui grey button" onClick={() => this.AddChar('%')}>Mod (%)</button>
                            <button className="ui grey button" onClick={() => this.AddChar('(')}>(</button>
                            <button className="ui grey button" onClick={() => this.AddChar(')')}>)</button>
                            <button className="ui grey button" onClick={() => this.AddChar('*')}>*</button>
                            <button className="ui grey button" onClick={() => this.AddChar('/')}>/</button>
                            <button className="ui grey button" onClick={() => this.AddChar('+')}>+</button>
                            <button className="grey ui button" onClick={() => this.AddChar('-')}>-</button>
                        </div>
                    </div>
                    <div className="bottom-row ui action input">
                        <input 
                            type="text"
                            name='equation'
                            placeholder="Answer"
                            value={this.state.answer}
                            readOnly
                        />
                        <button className="ui primary button" onClick={()=>this.AddChar("enter")}>=</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}

export default Calculator;