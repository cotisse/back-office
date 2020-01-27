import AuthForm from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import {
  CardBody,
  CardText,
} from 'reactstrap';
import axios from 'axios';

class AuthPage extends React.Component {
  constructor(props){
    super(props);
    this.state=
     {
       phoneOrEmail : "",
       password : "",
       error : ""
     } 
    
    this.handleUsernameChange=this.handleUsernameChange.bind(this);
    this.handlePasswordChange=this.handlePasswordChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  componentDidMount(){
    if(localStorage.getItem('accessToken')){
      this.props.history.push("/admin");
    }
  }
  async handleSubmit(event){
    event.preventDefault();
    const form = {
      "phoneOrEmail": this.state.phoneOrEmail,
      "password": this.state.password
      };
    const response = await axios.post('http://localhost:5001/api/auth/signin',form,
      {headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if(response.status === 200){
          localStorage.setItem('accessToken', response.data.accessToken);
          this.props.history.push("/admin");
        }
      }
      )
      .catch(
         (error) => {
          if (error.response.status === 401) {
            this.setState({error:<Card inverse className='bg-danger'>
            <CardBody>
              <CardText>
                mot de passe ou identifiant incorrect
              </CardText>
            </CardBody>
          </Card>})
          }
        }
      );
  }
  handleUsernameChange(username){
    this.setState({phoneOrEmail : username});
  }
  handlePasswordChange(ps){
    this.setState({password : ps});
  }
  render() {
    const password = this.state.password;
    const phoneOrEmail = this.state.phoneOrEmail;
    const error = this.state.error;
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <div className="text-center card-header">Cotisse-Admin</div>
            <AuthForm error={error} password={password} phoneOrEmail={phoneOrEmail} onUsernameChange={this.handleUsernameChange} onPasswordChange={this.handlePasswordChange} onFormSubmit={this.handleSubmit}/>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
