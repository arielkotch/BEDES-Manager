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
        // if key === Options, we need to create a nested accordian for the options
        if (key === 'Options') {
          const optionsArr = obj[key];
          const optionsLen = optionsArr.length

          const optionsArrPanels = optionsArr.map((optionObj, i) => {
            const optionObjContents = [];
            for (var key in optionObj) {
              if (optionObj.hasOwnProperty(key)) {
                optionObjContents.push(
                  <p key={ key + '_' + i }>{ key }: { optionObj[key] }</p>
                );
              }
            }

            return { title: i + ': Object - ' + optionObj.Term, content: { content: optionObjContents }, key: 'option_panel_' + i };
          });

          const optionsArrContent = (
            <Accordion.Accordion panels={ optionsArrPanels } />
          );

          const optionsRootPanel = [
            { title: 'Options: Array [' + optionsLen + ']', content: { content: optionsArrContent }, key: 'option_root_panel' }
          ];
          objContents.push(
            <Accordion panels={ optionsRootPanel }  styled />
          );
        } else {
          objContents.push(
            <p key={ key + '_' + i }>{ key }: { obj[key] }</p>
          );
        }
      }
    }

    return { title: i + ': Object - ' + obj.Term, content: { content: objContents }, key: 'panel_' + i };
  });

  const arrayContent = (
    <Accordion.Accordion panels={ arrayPanels } />
  );

  const rootPanel = [
    { title: 'Terms: Array [' + dataLen + ']', content: { content: arrayContent }, key: 'root_panel' }
  ];

  return (
    <Accordion panels={ rootPanel } styled />
  );
}

export default TransformsAccordian
