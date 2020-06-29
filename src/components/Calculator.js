import React from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import useInput from '../logic/useInput';

class Calculator extends React.Component{
    
    state = { equation: '', answer: 'Answer'};
    

    Clear(){
        this.setState({
            equation: "", 
            answer: "Answer"
        });
    }

    Calculate = () => {
        const output = useInput(this.state.equation);
        this.setState({answer: output});
    }

    AddChar(char){
        let v = this.state.equation;
        if(char==="enter" ||char==="="){ 
            if(v.length<=0){ this.setState({answer: "Answer"}); return;}
            this.Calculate(); return; 
        }
        if(char==="c"){ this.Clear(); return; }
        if(char==="backspace"){
            v = v.substring(0,v.length-1);
            this.setState({ 
                equation: v, 
                answer: "...fixing"
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
        let digits = [1,2,3,4,5,6,7,8,9];
        return(
            <div>
                <KeyboardEventHandler
                    handleKeys={['numeric','shift+8','-','/',
                        'shift+9','shift+0','shift+=','backspace',
                        'enter','shift+-', 'shift+5', 'shift+6',
                        'c','=','.',"'"]}
                    onKeyEvent={(key)=>{this.AddChar(key)}}
                />
                <div id="base2">
                    <div className="calculator">
                        
                        <h1>Calculator</h1>
                        <div id="top-row">
                            <input id="input"
                                name='equation'
                                value={this.state.equation}
                                readOnly
                            />
                            <button id="undo" onClick={()=>this.AddChar("backspace")}>&lt;--</button>
                        </div>
                        <br></br>
                        <input id="output"
                            value={this.state.answer}
                            readOnly/>
                        <div>
                            <div id="numbers">
                                <button  className="input-0"
                                onClick={() => this.AddChar("0")}>0</button>
                                <div id="digits">
                                    {digits.map(item => <button id = "number-button" className={"input-"+item}
                                    onClick={() => this.AddChar(item)}>{item}</button>).reverse()}
                                </div> 
                            </div>
                            <div id="operations">
                                <button id="operator" onClick={() => this.AddChar('(')}>(</button>
                                <button id="operator" onClick={() => this.AddChar(')')}>)</button>
                                <button id="operator" onClick={() => this.AddChar('+')}>+</button>
                                <button id="operator" onClick={() => this.AddChar('-')}>-</button>
                                <button id="operator" onClick={() => this.AddChar('*')}>*</button>
                                <button id="operator" onClick={() => this.AddChar('/')}>/</button>
                                <button id="operator" onClick={() => this.AddChar('%')}>%</button>
                                <button id="operator" onClick={() => this.AddChar('^')}>^</button>
                                <button id="operator" onClick={() => this.AddChar('.')}>.</button>
                            </div> 
                            <div id="big-action">
                                <button id="enter" onClick={()=>this.AddChar("enter")}>=</button>
                                <button id="clear" onClick={()=>this.Clear()}>CLEAR</button>
                            </div>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
        )
    }

}

export default Calculator;