import React from 'react'
import './Calculator.css'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import {Parser} from 'expr-eval'

export default class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            equation: ""
        }
    }

    handleChange = event => {
        this.setState({ equation : event.target.value });
    };

    clear(){
        this.setState({equation: ""});
        document.getElementById("output").value = "Answer";
    }

    isBalanced(str){
        let indexesFalse = [];
        let stack = [];
        for(let i = 0; i<str.length; i++){
            let temp = str.charAt(i);
            if(temp==="{"){ stack.push(temp); indexesFalse.push(i);}
            else if(temp==="}"){ stack.push(temp); indexesFalse.push(i);}
            else if(temp==="["){ stack.push(temp); indexesFalse.push(i);}
            else if(temp==="]"){ stack.push(temp); indexesFalse.push(i);}
            else if(temp==="("){ stack.push(temp); indexesFalse.push(i);}
            else if(temp===")"){ stack.push(temp); indexesFalse.push(i);}
        }
        return this.removeBrackets(stack,indexesFalse);
    }

    isBalanced(str){
        let indexesFalse = [];
        let stack = [];
        for(let i = 0; i<str.length; i++){
            let temp = str.charAt(i);
            if(temp==="{"){ stack.push(temp); indexesFalse.push(i);}
            else if(temp==="}"){ stack.push(temp); indexesFalse.push(i);}
            else if(temp==="["){ stack.push(temp); indexesFalse.push(i);}
            else if(temp==="]"){ stack.push(temp); indexesFalse.push(i);}
            else if(temp==="("){ stack.push(temp); indexesFalse.push(i);}
            else if(temp===")"){ stack.push(temp); indexesFalse.push(i);}
        }
        return this.removeBrackets(stack,indexesFalse);
    }

    removeBrackets(ar, indexes){
        let opposites = {
            "{":"}",    
            "(":")",    
            "[":"]"    
        }
        
        function recursionRemove(arr,ind,oppos){
            let flag = 0;
            let a = [].concat(arr);
            let b = [].concat(ind);
            let size = a.length-1;
            for(let i = 0; i<size; i++){
                if(oppos[a[i]] == a[i+1]){
                    a.splice(i,2);
                    b.splice(i,2);
                    flag++;
                    size = size-2;
                    i--;
                }
            }
            if(flag>0){ return recursionRemove(a, b, oppos);}
            else{ return [a,b] }
        }
        
        let [result, indexJ] = recursionRemove(ar,indexes,opposites);

        let size = result.length;
        for(let h = 0; h<size; h++){
        	if((h+2)<size){
          	if(opposites[result[h]] == result[h+2]){
            	result.splice(h,1);
              result.splice(h+1,1);	//updated, so +2 is now +1
              indexJ.splice(h,1);
              indexJ.splice(h+1,1);
              size = size-2;
              h--;
            }
          }
        }
        return indexJ;
    }
    

    clean(input){
        let t = input;
        t = t.replace(/'/g,"");
        if(t.match(/\*(\*)+/g)!=null){t = t.replace(/\*(\*)+/g,"^");}
        if(t.match(/\+(\+)+/g)!=null){t = t.replace(/\+(\+)+/g,"+");}
        if(t.match(/\-(\-)+/g)!=null){t = t.replace(/\-(\-)+/g,"-");}
        if(t.match(/(\(|\))/g) !=null){ //clean any unclosed brackets
            let v = this.isBalanced(t);
            if(v.length>0){
                for(let i=v.length-1; i>=0; i--){
                    if(v[i]<t.length-1){
                        let a = (t.substring(0,v[i])).concat(t.substring(v[i]+1,t.length));
                        t = a;
                    }
                    else{
                        let a = t.substring(0,v[i]);
                        t = a;
                    }
                }
            }
        }
        if(t.match(/(?<=\d)\(/g) !=null){t = t.replace(/(?<=\d)\(/g,"*(");}
        if(t.match(/(?=\d)\)/g) !=null){t = t.replace(/(?=\d)\)/g,"*)");}
        console.log(t);
        return t;
    }

    evaluate(){
        //let parser = Parser();
        let input = this.clean(this.state.equation);
        let expr = Parser.parse(input)
        console.log(expr.evaluate());
        document.getElementById("output").value = expr.evaluate();
    }

    addChar(char){
        let v = this.state.equation;
        if(char==="enter" ||char==="="){ 
            if(v.length<=0){ document.getElementById("output").value = "Answer"; return;}
            this.evaluate(); return; 
        }
        if(char==="c"){ this.clear(); return; }
        if(char==="backspace"){
            v = v.substring(0,v.length-1);
            this.setState({ equation: v});
            document.getElementById("output").value = "...fixing";
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
            <div id="app">
                <div id="base2">
                    <div className="calculator">
                        <KeyboardEventHandler
                            handleKeys={['numeric','shift+8','-','/',
                                'shift+9','shift+0','shift+=','backspace',
                                'enter','shift+-', 'shift+5', 'shift+6',
                                'c','=','.',"'"]}
                            onKeyEvent={(key,e)=>
                                {this.addChar(key)}
                            }
                        />
                        <h1>Calculator</h1>
                        <div id="top-row">
                            <input id="input"
                                name='equation'
                                value={this.state.equation}
                                readOnly
                            />
                            <button id="undo" onClick={()=>this.addChar("backspace")}>&lt;--</button>
                        </div>
                        <br></br>
                        <input id="output" 
                            value = "Answer"
                            readOnly>
                        </input>
                        <div>
                            <div id="numbers">
                                <button  className="input-0"
                                onClick={() => this.addChar("0")}>0</button>
                                <div id="digits">
                                    {digits.map(item => <button id = "number-button" className={"input-"+item}
                                    onClick={() => this.addChar(item)}>{item}</button>)}
                                </div> 
                            </div>
                            <div id="operations">
                                <button id="operator" onClick={() => this.addChar('(')}>(</button>
                                <button id="operator" onClick={() => this.addChar(')')}>)</button>
                                <button id="operator" onClick={() => this.addChar('+')}>+</button>
                                <button id="operator" onClick={() => this.addChar('-')}>-</button>
                                <button id="operator" onClick={() => this.addChar('*')}>*</button>
                                <button id="operator" onClick={() => this.addChar('/')}>/</button>
                                <button id="operator" onClick={() => this.addChar('%')}>%</button>
                                <button id="operator" onClick={() => this.addChar('^')}>^</button>
                                <button id="operator" onClick={() => this.addChar('.')}>.</button>
                            </div> 
                            <div id="big-action">
                                <button id="enter" onClick={()=>this.addChar("enter")}>=</button>
                                <button id="clear" onClick={()=>this.clear()}>CLEAR</button>
                            </div>
                        </div>
                        <br></br>
                    </div>
                </div>
                <div id="base">
                    <div id="instructions">
                        <h3>
                            Instructions/Clarification
                        </h3>
                        <ul>
                            <li>
                                Input follows a "coding style". I.e. "2**3" = 8 etc.
                            </li>
                            <li>
                                You can give input through the buttons, tabs and enter, or by typing.
                            </li>
                            <li>
                                If not tabbed through, you can use either the "=" or "enter" key to calculate your input. 
                            </li>
                            <br></br>
                            <li>
                                If you don't imply multiplication on brackets--it's okay! Things like "5(6)" will work the same as 5*6.
                            </li>
                            <li>
                                Unclosed brackets will be removed. Be careful. If you mistype "5(6)" as "5(6" it will be treated "56" and not evaluate to "30".
                            </li>
                            <li>
                                Either "-" or "shift + -" i.e. the "_" key will function as subtraction. So if you still have shift held while typing fast, it's okay!
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="base">
                    <div id="instructions">
                        <p>
                            This was a project dedicated to begin exploring AIRA accessibility standards. It is a work in progress! Built by 
                            <a href="https://github.com/Jamesrbrtsn">@Jamesrbrtsn</a>
                            , using <a href="https://reactjs.org/">React.js</a>, 
                            <a href="https://github.com/silentmatt/expr-eval/tree/master"> Javascript Expression Evaluator</a>,
                            and <a href="https://github.com/linsight/react-keyboard-event-handler">React Keyboard Event Handler</a>.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

}