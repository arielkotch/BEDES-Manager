import React, { Component } from 'react';
// import axios from 'axios';
import { Segment, Button } from 'semantic-ui-react';

import Option from './Option';

export default class Term extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  // delete term onClick handler
  handleDeleteButtonClick = () => {
    // axios.delete('/api/term/delete/' + this.state.term['Content-UUID'])
    //   .then(function (response) {
    //     this.setState({
    //       term: false
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  render() {
    const termData = this.props.termData;
    console.log(termData);

    // create list of Option components
    // let optionList = termData.Options.map((optionData, index) => {
    //   return (
    //     <Option optionData={optionData} key={index}/>
    //   );
    // });



    return (
      <div>asdf</div>
    );
  }
}


//   {
//     this.props.termDataNotFound
//     ?
//       <div className="red-text">Term not found</div>
//     :
//       null
//   }
//   {
//     this.props.termDataDeleted
//     ?
//       <div className="red-text">Term deleted</div>
//     :
//       null
//   }
