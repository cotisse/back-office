import React,{ Component } from "react";
import Page from 'components/Page';

class Trips extends Component{
    render(){
        return(
            <Page
              className="Trips"
              title="Trips"
              breadcrumbs={[{ name: 'Trips', active: true }]}
            >

            </Page>
        );
    }
}
export default Trips;