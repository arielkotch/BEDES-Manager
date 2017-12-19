import React, { Component } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';
import Delete from './Delete';

export default class ProposedTable extends Component {

  constructor(props) {
    super(props);
    this.addDelete = new Delete();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    alert('This Term will be deleted.')
    this.addDelete.deleteTerm(this.props.obj._id);
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          {this.props.obj['Updated-date']}
        </Table.Cell>
        <Table.Cell>
          {this.props.obj.URL}
        </Table.Cell>
        <Table.Cell>
          {this.props.obj.Term}
        </Table.Cell>
        <Table.Cell>
          {this.props.obj.Category}
        </Table.Cell>
        <Table.Cell>
          {this.props.obj['Term-Definition']}
        </Table.Cell>
        <Table.Cell>
          {this.props.obj.Application}
        </Table.Cell>
        <Table.Cell>
          {this.props.obj.Sector}
        </Table.Cell>
        <Table.Cell>
          {this.props.obj['Unit-of-Measure']}
        </Table.Cell>
        <Table.Cell>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit" value="Submit" negative>Delete</Button>
        </Form>
        </Table.Cell>
      </Table.Row>

    )
  }
}
