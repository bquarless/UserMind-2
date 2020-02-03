import React from 'react';
import reportDates from '../apis/reportDates';
import ReportList from './ReportList';
import SalesTable from './SalesTable';
import AmStackedChart from './AmStackedChart';

import '../App.css';

class App extends React.Component {
    state= { 
        reportDateOptions: [],
        selectedDates: [],
        refreshChild: false
    };

    componentDidMount() {
       this.onReportDates();
     }

     onReportDates = async () => {
        const response = await reportDates.get();
        this.setState({
            reportDateOptions: response.data,
        });
    } 

    callbackFunction = (childData) => {
        this.setState({
             selectedDates: childData,
             refreshChild: true     
        })
    }

  render() {    
    return (
        <div>
            <div className="grid-container">
                <div className="item1"></div>
                <div className="item2">
                   <ReportList reportDates ={this.state.reportDateOptions} parentCallback = {this.callbackFunction}/>
                </div>

                <div className="item3">
                    <div> 
                        <SalesTable refreshChild={this.state.refreshChild} selectedDates={this.state.selectedDates}/>
                    </div>

                    <div> 
                        <AmStackedChart refreshChild={this.state.refreshChild} selectedDates={this.state.selectedDates} paddingRight={20}  />
                    </div> 
                </div>

                <div className="item5">
                    
                </div>
            </div>
        </div>
    );
  }    
};

export default App;