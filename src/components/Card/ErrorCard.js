import { Card, CardBody, CardText } from 'reactstrap';
import {ERR_WEBSERVICE} from 'utils/constants';

import React from 'react';
class ErrorCard extends React.Component{
    render(){
        var message = ERR_WEBSERVICE;
        if(this.props.error.response){
            message = this.props.error.response.data.message;
        }else if(this.props.error.message){
            message = this.props.error.message;
        }
        return(
        <Card inverse className='bg-danger'>
            <CardBody>
                <CardText>
                    {this.props.source+" : "+message}
                </CardText>
            </CardBody>
        </Card>);
    }
}

export default ErrorCard;