// @flow

import React from "react";
import "./SuppressionTechniquesList.css";

const techniques = [
    {
        title: 'Interruptions',
        description: <div className="suppression-desc">If one line indicates that someone is talking and another line crosses that line from below we have a likely interruption. An example is show here
            <img src="images/interruption.png" alt="example of how two lines crossing in a way that indicates an interruption"/>
        </div>
    },
    {
        title: 'Is everyone heard on the important topics',
        description: 'It\'s important that everyone gets an equal say in the meeting, but just looking at how long each person speaks will not tell you the whole truth. You also need to make sure that everyone is heard when the important topics are discussed and when decisions are made.',
    },
];
export function SuppressionTechniquesList() {
  return (
    <div className="suppression-list">
      {techniques.map(t => <Technique key={t.title} technique={t} />)}
    </div>
  );
}

function Technique(props) {
  const { technique } = props;
  return (
    <div className="suppression-technique">
        {
            typeof technique.title === 'string'
                ? <h1 className="suppression-name">{technique.title}</h1>
                : technique.title
        }

        {
            typeof technique.description === 'string'
                ? <div className="suppression-desc">{technique.description}</div>
                : technique.description
        }
    </div>
  );
}
