import React from 'react';
import axios from 'axios';

import './SalesTable.css';

class SalesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reportData: [],
            refreshChild: false,
        }; 
     }

    getTableRowData(entry) {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/fruitReport/${entry}`)
               .then( function(response) {
                   resolve(response.data);
               });
        });
    }

    componentDidUpdate(props) {
        if(this.props.refreshChild !== this.state.refreshChild ) {
            this.props.selectedDates.forEach((entry) =>  {
                this.getTableRowData(entry)
                .then( (data) => {
                    this.setState( state => {
                        const reportData = state.reportData.concat(data);
                        return {
                            reportData,
                            refreshChild: true,
                        }
                    })
                })
            });
        }
    }

    renderTableHeader() {
        if(this.state.reportData.length === 0) {
           return;
        } 

        let header = Object.keys(this.state.reportData[0]);
        header.shift();
        return header.map((key, index) => {
           return <th key={index}>{key.toLowerCase()}</th>
        })
    }
    
    renderTableData() {
        if(this.state.reportData.length === 0) {
            return;
        } 

        return this.state.reportData.map((reportRow, index) => {
            const { id, date, bananas, strawberries, apples, oranges } = reportRow;
            return (
                <tr key={id}>
                    <td>{date}</td>
                    <td>{bananas}</td>
                    <td>{strawberries}</td>
                    <td>{apples}</td>
                    <td>{oranges}</td>
                </tr>
            )
        });    
    }

    render() {
        return ( 
          <div>
            <h3 id='title'>Fruit Sales Report</h3>
            <table id='salesTable'>
               <tbody>
                  {<tr>{this.renderTableHeader()}</tr>}
                  {this.renderTableData()}
               </tbody>
            </table>
          </div>
        )  
    }
}

export default SalesTable;