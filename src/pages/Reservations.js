import React,{ Component } from "react";
import Page from 'components/Page';

class Reservations extends Component{
    render(){
        return(
            <Page
              className="Reservations"
              title="Reservations"
              breadcrumbs={[{ name: 'Reservations', active: true }]}
            >

            </Page>
        );
    }
}
export default Reservations;