import React from 'react';

const ProjectInformation = () => {
    return(
        <div className="project-information">
            <p>{`This was a project dedicated to begin exploring AIRA accessibility standards.`
                +` It is a work in progress! Built by `} <a href="https://github.com/Jamesrbrtsn">@Jamesrbrtsn</a>{`, `+
                `using `}<a href="https://reactjs.org/">React.js</a>{`, `}
                <a href="https://github.com/silentmatt/expr-eval/tree/master"> Javascript Expression Evaluator</a>{`, `+
                `and `}<a href="https://github.com/linsight/react-keyboard-event-handler">React Keyboard Event Handler</a>.
            </p>
        </div>
    )
}

export default ProjectInformation;
