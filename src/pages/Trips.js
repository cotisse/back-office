import React,{ Component } from "react";
import Page from 'components/Page';
import PageSpinner from 'components/PageSpinner';
import {getAllClasses, getVehiculeByClass , getAllTrips,getAllJourney} from '../utils/APIutils';
import axios from 'axios';
import {BASE_URL} from 'utils/constants';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row
  } from 'reactstrap';

class Trips extends Component{
    constructor(props){
        super(props);
        this.state={
            trips : [],
            title : <PageSpinner />,
            errors: [],
            date : "",
            selectedClass :"",
            selectedCar :"",
            classes :[],
            vehicles :[],
            vehiclesByClass :[],
            vehicle:"",
            destination:"",
            destinations : []
        };
        this.handleClassChange = this.handleClassChange.bind(this);
        this.saveTrip = this.saveTrip.bind(this);
    }
    componentDidMount(){
        if(!localStorage.getItem("accessToken")){
            this.props.history.push("/");
        }

//GET CLASSES
        getAllClasses()
        .then(response =>{
            this.setState({classes : response});
            this.setState({okay : 'cars'});
        })
        .catch(error => { 
          this.state.errors.push("Classes : "+error.message);
          this.setState({okay : error.message});
        });
//TRIPS
        getAllTrips()
        .then(response =>{
            this.setState({trips : response});
            this.setState({title : 'trips'});
        })
        .catch(error => { 
            this.state.errors.push("trips : "+error.message);
            this.setState({title : error.message});
        });
//journey
        getAllJourney()
        .then(response =>{
            this.setState({destinations : response});
        })
        .catch(error => { 
            this.state.errors.push("destinations : "+error.message);
        });

    }
    handleClassChange(event){
        event.preventDefault();
        this.setState({selectedClass : event.target.value});
        getVehiculeByClass(event.target.value)
        .then(response =>{
            this.setState({vehiclesByClass : response});
        })
        .catch(error => { 
          this.state.errors.push("vehicles by classe : "+error.message);
        });
    }
    handleClassPick(){
        const classes = this.state.classes;
        const vehiclesByClass = this.state.vehiclesByClass;
        var classItems = classes.map((classe) =>
            <option key={classe.id} value={classe.id}>{classe.label}</option>
        );
        var vehicleByClass = vehiclesByClass.map((v) =>
            <option key={v.id} value={v.id}>{v.registration+ " (" + v.brand +")"}</option>
        );
        
        var pickVh = "";
        if(this.state.selectedClass != ""){
            pickVh = <Row>
            <Col lg={12}>
                <Card>
                <CardHeader>3 - vehicle</CardHeader>
                <CardBody>
                <FormGroup>
                    <Col>
                        <select className="form-control" onChange={(e) => this.setState({selectedCar : e.target.value})}>
                            {vehicleByClass}
                        </select>
                    </Col>
                </FormGroup>
                </CardBody>
                </Card>
            </Col>
        </Row>
        }
        return(
            <Col lg={3}>
                <Row>
                    <Col lg={12}>
                        <Card>
                        <CardHeader>2 - Class </CardHeader>
                        <CardBody>
                        <FormGroup >
                            <Col>
                                <select className="form-control" onChange={this.handleClassChange }>
                                <option disabled="true" selected="true" >choose a class</option>
                                    {classItems}
                                </select>
                            </Col>
                        </FormGroup>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
                {pickVh}
            </Col>

        );
    }
    handleDestinationPick(){
        const destinations = this.state.destinations;
        var itemsdest = destinations.map((d) =>
        <option key={d.id} value={d.id}>{d.depart_code +" - "+d.arrival_code}</option>);
        return(
            <Col lg={6}>
                <Card>
                <CardHeader>4 - journey</CardHeader>
                <CardBody>
                        <FormGroup >
                            <Col>
                                <select className="form-control" onChange={(e) => this.setState({destination : e.target.value})}>
                                <option disabled="true" selected="true" >choose a destination</option>
                                    {itemsdest}
                                </select>
                            </Col>
                        </FormGroup>
                        </CardBody>
                </Card>
            </Col>
        );
    }
    formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    saveTrip(e){
        e.preventDefault();
        const newTrip = {
            "departure_date":this.state.date,
            "id_vehicle":this.state.selectedCar,
            "id_destination":this.state.destination
        }
        const response = axios.post(
            BASE_URL+'/api/backoffice/trip/save',
            newTrip,
            {headers: { 'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('accessToken') }})
            .then((response) => {
              if(response.status == 201){
               alert("saved");
              }
            //   this.setState({buttonText : 'submit'});
            })
            .catch((error) => {
                alert(error);
                console.log(error);
            //   this.setState({buttonText : 'submit'});
            //   this.setState({insertError : <ErrorCard error={error} source="new vehicle" />
            //   })
            });
    }
    render(){
        
        var d = this.formatDate();
        return(
            <Page
              className="Trips"
              title=""
              breadcrumbs={[{ name: 'Trips', active: true }]}
            >
            <Form>
            <Card className="bg text-white">
            <CardBody>
                <h2>New Trip?</h2>
            </CardBody>
            </Card>
            <br/>
            <Row>
              <Col lg={3}>
                <Card>
                  <CardHeader>1 - depature date </CardHeader>
                  <CardBody>
                    <FormGroup >
                        <Col>
                        <Input
                            onChange={(e) => this.setState({date : e.target.value})}
                            type="date"
                            name="date"
                            min={d}
                          />
                        </Col>
                      </FormGroup>
                  </CardBody>
                </Card>
              </Col>
              {this.handleClassPick()}
              {this.handleDestinationPick()}
            </Row>
            <Row>
            <FormGroup check>
              {/* {this.state.insertError} */}
              <br/>
              <Col className="text-center">
              <Button onClick={this.saveTrip} className="btn primary">ok</Button>
              </Col>
            </FormGroup>
            </Row>
            </Form>
            </Page>
        );
    }
}
export default Trips;