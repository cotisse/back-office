import React,{ Component } from "react";
import Page from 'components/Page';
import { getAllVehicule ,getAllClasses} from '../utils/APIutils';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
    Table,
    CardText
  } from 'reactstrap';
import { withRouter } from "react-router";
import axios from 'axios';

class Vehicles extends Component{
    constructor(props){
        super(props);
        this.state = { insertError:"",vehicles : [],classes:[],error:"",immatriculation:"",details:"",selectedClass:1};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
      if(!localStorage.getItem("accessToken")){
        this.props.history.push("./admin/login");
      }
    }
    componentDidMount(){
        getAllVehicule()
        .then(response =>{
            this.setState({vehicles : response})
        }
        ).catch(error => { this.setState({error : error.message}) });
        getAllClasses()
        .then(response =>{
            this.setState({classes : response})
        }
        ).catch(error => { this.setState({error : error.message}) });
    }
    handleSubmit(event){
        event.preventDefault();
        const form = {
            "id_classe":this.state.selectedClass,
            "details" : this.state.details,
            "immatriculation":this.state.immatriculation
        }
          const response = axios.post('http://localhost:5001/api/backoffice/vehicule/save',form,
            {headers: { 'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('accessToken') }
            })
            .then((response) => {
                if(response.status == 201){
                  getAllVehicule()
             .then(response =>{
            this.setState({vehicles : response})
        }
        ).catch(error => { this.setState({error : error.message}) });
                }
            }
            )
            .catch(
               (error) => {
                  this.setState({insertError : <Card inverse className='bg-danger'>
                  <CardBody>
                    <CardText>
                      {error.response.data.message}
                    </CardText>
                  </CardBody>
                </Card>});
                
              }
            );
    }
    render(){
        const vh = this.state.vehicles;
        const classes = this.state.classes;
        var classItems = classes.map((classe) =>
            <option key={classe.id} value={classe.id}>{classe.label}</option>
        );
        var list = <h2>no result to display</h2>;
        var items = vh.map((vehicule) => 
                <tr key={vehicule.id} >
                    <td>{vehicule.details}</td>
                    <td>{vehicule.immatriculation}</td>
                </tr>
        );
        if(vh.length > 0){
            list = <Table bordered >
            <thead>
              <tr>
                <th>details</th>
                <th>immatriculation</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </Table>
        }
        return(
            <Page
              className="Vehicles"
              title="Vehicles"
              breadcrumbs={[{ name: 'Vehicles', active: true }]}
            >
            <Row>
                <h2>{this.state.error != '' && this.state.error}</h2>
                <Col lg={6}>
                    <Card>
                        <CardHeader>Cars</CardHeader>
                        <CardBody>
                            {list}
                        </CardBody>
                     </Card>
                </Col>
                <Col lg={6}>
                <Card>
            <CardHeader>New Car</CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup >
                  <Col>
                  <Label for="numero" >
                    immatriculation
                  </Label>
                    <Input
                    value={this.state.immatriculation}
                      type="text"
                      name="numero"
                      placeholder="ex : 9848 TBC"
                      onChange={(e) => this.setState({immatriculation : e.target.value})}
                    />
                  </Col>
                </FormGroup>
                <FormGroup >
                  <Col>
                  <Label for="numero" >
                    details
                  </Label>
                    <Input
                        value={this.state.details}
                        type="text"
                        name="details"
                        placeholder="ex : wolswagen T11"
                        onChange={(e) => this.setState({details : e.target.value})}
                    />
                  </Col>
                </FormGroup>
                
                <FormGroup >
                  <Col>
                  <Label for="exampleSelect" >
                    Select
                  </Label>
                    <select selected= {this.state.selectedClass} className="form-control" onChange={(e) => this.setState({selectedClass : e.target.value})}>
                        {classItems}
                    </select>
                  </Col>
                </FormGroup>
              
               
                <FormGroup check row>
                  {this.state.insertError}
                  <br/>
                  <Col className="text-center">
                    <Button className="btn primary">Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
                </Col>
            </Row>
            </Page>
        );
    }
}
export default withRouter(Vehicles);