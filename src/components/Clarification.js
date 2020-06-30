import React, {useState} from 'react';

const Clarification = () => {

    const [visibile, setVisible] = useState(false);

    function renderList(vis){
        if(vis===true){
            return(
                <ul className="ui list">
                    <li>
                        Input follows a "coding style". I.e. "2**3" = 8 etc.
                    </li>
                    <li>
                        You can give input through the buttons, tabs and enter, or by typing.
                    </li>
                    <li>
                        If not tabbed through, you can use either the "=" or "enter" key to calculate your input. 
                    </li>
                    <li>
                        "%" is a modulous operation, not a percent operator
                    </li>
                    <li>
                        If you don't imply multiplication on brackets--it's okay! Things like "5(6)" will work the same as 5*6.
                    </li>
                    <li>
                        Unclosed brackets will be removed. Be careful. If you mistype "5(6)" as "5(6" it will be treated "56" and not evaluate to "30".
                    </li>
                    <li>
                        Either "-" or "shift + -" i.e. the "_" key will function as subtraction. So if you still have shift held while typing fast, it's okay!
                    </li>
                    <li>
                        "%" is a modulous operation, not a percent operator
                    </li>
                </ul>
            )
        }        
    }

    return(
        <div className="clarification">
            <button className="ui mini button" onClick={()=>setVisible(!visibile)}>Instructions/Clarification</button>
            {renderList(visibile)}
        </div>
    )
}

export default Clarification;
