// @flow

import React from "react";
import "./SuppressionTechniquesList.css";

const techniques = [
  {
    name: "Making Invisible",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  },
  {
    name: "Ridicule",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  },
  {
    name: "Withholding information",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  },
  {
    name: "Double bind",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  },
  {
    name: "Heap blame or Put to shame",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  },
  {
    name: "Objectifying ",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  },
  {
    name: "Force or Threat to force",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  }
];
export function SuppressionTechniquesList() {
  return (
    <div className="suppression-list">
      {techniques.map(t => <Technique key={t.name} technique={t} />)}
    </div>
  );
}

function Technique(props) {
  const { technique } = props;
  return (
    <div className="suppression-technique">
      <h1 className="suppression-name">{technique.name}</h1>
      <div className="suppression-desc">{technique.description}</div>
    </div>
  );
}
