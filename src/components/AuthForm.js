import React from 'react';
import {Button, Form, FormGroup, Input } from 'reactstrap';


class AuthForm extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit(event);
  };
  validateForm() {
    let result = this.props.phoneOrEmail.length > 0 && this.props.password.length > 0;
    console.log(result);
    return result;
  }
  render() {
    const children = this.props.children;
    const phoneOrEmail = this.props.phoneOrEmail;
    const password = this.props.password;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Input type="text" placeholder="Phone or Email" value={phoneOrEmail} onChange={e => this.props.onUsernameChange(e.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Input type="password" placeholder="your password" value={password} onChange={e => this.props.onPasswordChange(e.target.value)}/>
        </FormGroup>
        {this.props.error}
        <br/>
        <Button
          disabled={!this.validateForm()}
          size="lg"
          className="bg-gradient-theme-left border-0"
          block type="submit">
          login
        </Button>

      
          
        

        {children}
      </Form>

    );
  }
}




export default AuthForm;
