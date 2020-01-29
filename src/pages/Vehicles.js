import React,{ Component } from "react";
import Page from 'components/Page';
import { getAllVehicule ,getAllClasses, getAllBrands} from '../utils/APIutils';
import PageSpinner from 'components/PageSpinner';
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
import {BASE_URL} from 'utils/constants';
class Vehicles extends Component{
    constructor(props){
        super(props);
        this.state = { 
          insertError:"",
          vehicles : [],
          classes:[],
          brands:[],
          errors:[],
          registration:"",
          place_number:"",
          selectedClass:1,
          selectedBrand:1,
          description:"",
          buttonText:"submit",
          okay:<PageSpinner color='dark'/> 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVehicleList = this.handleVehicleList.bind(this);
    }
    componentDidMount(){
      if(!localStorage.getItem("accessToken")){
        this.props.history.push("/");
      }  
      // GET CARS
      getAllVehicule()
      .then(response =>{
        this.setState({vehicles : response});
        this.setState({okay : 'cars'});
      })
      .catch(error => { 
        this.state.errors.push(error.message);

      });

      //GET CLASSES
      getAllClasses()
      .then(response =>{
          this.setState({classes : response});
          
      })
      .catch(error => { 
        this.state.errors.push(error.message);
      });

      //GET BRANDS
      getAllBrands()
      .then(response =>{
          this.setState({brands : response});
          
      })
      .catch(error => { 
        this.state.errors.push(error.message);
      });
    }
    handleSubmit(event){
      event.preventDefault();
      this.setState({buttonText : <PageSpinner color='light'/>});
      const form = {
        "id_classe":this.state.selectedClass,
        "id_brand":this.state.selectedBrand,
        "place_number":this.state.place_number,
        "registration":this.state.registration,
        "description" : this.state.description
      }
      
      const response = axios.post(
        BASE_URL+'/api/backoffice/vehicule/save',
        form,
        {headers: { 'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('accessToken') }})
        .then((response) => {
          if(response.status == 201){
            getAllVehicule()
            .then(response =>{
              this.setState({vehicles : response})
            })
            .catch(error => { this.setState({error : error.message}) });
          }
          this.setState({buttonText : 'submit'});
        })
        .catch((error) => {
          this.setState({buttonText : 'submit'});
          this.setState({insertError : 
            <Card inverse className='bg-danger'>
              <CardBody>
                <CardText>
                  {error.response.data.message}
                </CardText>
              </CardBody>
            </Card>
          })
        });
    }
    handleVehicleList(props){
        var items = this.state.vehicles.map((vehicule) => 
        <tr key={vehicule.id} >
            <td>{vehicule.place_number}</td>
            <td>{vehicule.registration}</td>
        </tr>);
        return (
          <Col lg={6}>
          <Card>
            <CardHeader>{this.state.okay}</CardHeader>
              <CardBody>
                <Table bordered >
                  <thead>
                    <tr>
                      <th>place_number</th>
                      <th>registration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        )
     
        //afaka misy else to
    }
    // spin(props){
    //   return(

    //     <Col className="" lg={6}>
    //     <Card>
    //       <CardHeader>Cars</CardHeader>
    //       <CardBody><h2>attente...</h2><PageSpinner color='primary'/> </CardBody>
    //     </Card>
    //   </Col>
    //     );
    // }
    render(){
      //mila verifiena
        const classes = this.state.classes;
        const brands = this.state.brands;
        var classItems = classes.map((classe) =>
            <option key={classe.id} value={classe.id}>{classe.label}</option>
        );
        var brandsItem = brands.map((brand) =>
            <option key={brand.id} value={brand.id}>{brand.label}</option>
        );
        return(
            <Page
              className="Vehicles"
              title="Vehicles"
              breadcrumbs={[{ name: 'Vehicles', active: true }]}
            >
            <Row>
              {/* <h2>{this.state.error != '' && this.state.error}</h2> */}
              {/* {this.state.okay ? this.handleVehicleList(this.props) : this.spin(this.props)} */}
             {this.handleVehicleList(this.props)}
              <Col lg={6}>
                <Card>
                  <CardHeader>New Car</CardHeader>
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup >
                        <Col>
                        <Label>
                          brand
                        </Label>
                          <select className="form-control" onChange={(e) => this.setState({selectedBrand : e.target.value})}>
                              {brandsItem}
                          </select>
                        </Col>
                      </FormGroup>
                      <FormGroup >
                        <Col>
                          <Label for="numero" >
                            registration
                          </Label>
                          <Input
                            value={this.state.registration}
                            type="text"
                            name="numero"
                            placeholder="ex : 9848 TBC"
                            onChange={(e) => this.setState({registration : e.target.value})}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup >
                        <Col>
                        <Label >
                          place number
                        </Label>
                          <Input
                              value={this.state.place_number}
                              type="number"
                              name="place_number"
                              onChange={(e) => this.setState({place_number : e.target.value})}
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
                      <FormGroup >
                        <Col>
                        <Label >
                          description
                        </Label>
                           <Input value={this.state.description} placeholder="car description (model, color, ...)" type="textarea" name="text" onChange={(e) => this.setState({description : e.target.value})} />
                        </Col>
                      </FormGroup>
                      <FormGroup check row>
                        {this.state.insertError}
                        <br/>
                        <Col className="text-center">
                        <Button className="btn primary">{this.state.buttonText}</Button>
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