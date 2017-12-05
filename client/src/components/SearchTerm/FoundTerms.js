import React from 'react'
import { Accordion } from 'semantic-ui-react'

const TransformsAccordian = (props) => {
  const termData = props.termData;
  let dataLen = termData.length;
  console.log(termData);
  console.log('termData length: ' + dataLen);

  const arrayPanels = termData.map((obj, i) => {

    const objContents = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(key);
        if (key != 'Options') {
          objContents.push(
            <p key={ key + '_' + i }>{ key }: { obj[key] }</p>
          );
        }
      }
    }

    return { title: i + ': Object', content: { content: objContents }, key: 'panel_' + i };
  });





  const arrayContent = (
    <div>
      <Accordion.Accordion panels={ arrayPanels } />
    </div>
  );

  const rootPanel = [
    { title: 'Terms: Array [' + dataLen + ']', content: { content: arrayContent }, key: 'root_panel' }
  ];

  return (
    <Accordion panels={ rootPanel } styled />
  );
}

export default TransformsAccordian
