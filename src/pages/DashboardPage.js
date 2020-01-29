
import Page from 'components/Page';

import { IconWidget} from 'components/Widget';

import React from 'react';
import { Line } from 'react-chartjs-2';

import {

  Card,
  CardBody,

  CardHeader,

  Col,
 
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import { Pie} from 'react-chartjs-2';
import { randomNum } from 'utils/demos';

const today = new Date();

const genPieData = () => {
  return {
    datasets: [
      {
        data: [19, 57, 24],
        backgroundColor: [
          getColor('danger'),
          getColor('primary'),
          getColor('warning')
        ],
        label: 'Dataset 1',
      },
    ],
    labels: ['Lite', 'premium', 'VIP'],
  };
};
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const genLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'lite',
        backgroundColor: getColor('danger'),
        borderColor: getColor('danger'),
        borderWidth: 1,
        data: [
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
        ],
        ...moreData,
      },
      {
        label: 'premium',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
        ],
        ...moreData2,
      },
      {
        label: 'vip',
        backgroundColor: getColor('warning'),
        borderColor: getColor('warning'),
        borderWidth: 1,
        data: [
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
          randomNum(1,100),
        ],
        ...moreData2,
      },
    ],
  };
};
class DashboardPage extends React.Component {
  componentWillMount(){
    if(!localStorage.getItem("accessToken")){
      this.props.history.push("./admin/login");
    }
  }
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {

    return (
      <Page
        className="DashboardPage"
        title="statistics"
        breadcrumbs={[{ name: 'statistics', active: true }]}
      >
        

        <Row>
          <Col lg="7" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>variations of reservations</CardHeader>
            <CardBody>
              <Line data={genLineData({ fill: false }, { fill: false })} />
            </CardBody>
          </Card>
          </Col>

          <Col lg="5" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>percentage of reservations per class</CardHeader>
            <CardBody>
              <Pie data={genPieData()} />
            </CardBody>
          </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <br/>
            <h2>which destinations are the most popular?</h2>
            <br/>
            <Row>
          <Col >
          <IconWidget
                bgColor={'dark'}
                title={'Tulear - Antananarivo'}
                subtitle={'567 trips'}
                
              />
          </Col>
          
          <Col >
            
            <IconWidget
                bgColor={'dark'}
                title={'Antananarivo - Mahajanga'}
                subtitle={'356 trips'}
                
              />
          </Col>

          <Col >
          <IconWidget
                bgColor={'dark'}
                title={'Tamatave - Antananarivo'}
                subtitle={'102 trips'}
                
              />
          </Col>

         
            </Row>
          </Col>
        </Row>
       

      </Page>
    );
  }
}
export default DashboardPage;
