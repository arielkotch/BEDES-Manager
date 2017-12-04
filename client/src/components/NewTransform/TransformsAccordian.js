import React from 'react'
import { Accordion } from 'semantic-ui-react'



const AccordionExampleNested = (props) => {
  console.log(props.newTransformsData);

  const newTransformsData = props.newTransformsData;

  const arrayPanels = newTransformsData.map((obj, i) => {

    const objContents = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        objContents.push(
          <p key={ key + '_' + i }>{ key }: { obj[key] }</p>
        );
      }
    }

    return { title: i + ': Object', content: { content: objContents }, key: 'panel_' + i };
  });

  const len = newTransformsData.length;
  // push value bedes transformation to arrayPanels
  const obj = props.valueTermTransformData;
  const objContents = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      objContents.push(
        <p key={ key + '_' + len }>{ key }: { obj[key] }</p>
      );
    }
  }
  arrayPanels.push(
    { title: len + ': Object', content: { content: objContents }, key: 'panel_' + len }
  );

  const arrayContent = (
    <div>
      <Accordion.Accordion panels={ arrayPanels } />
    </div>
  );

  const rootPanel = [
    { title: 'Transforms: Array [' + (newTransformsData.length + 1) + ']', content: { content: arrayContent }, key: 'root_panel' }
  ];

  return (
    <Accordion panels={ rootPanel } styled />
  );
}

export default AccordionExampleNested
