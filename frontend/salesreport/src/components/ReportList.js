import React from 'react';

import './ReportList.css';

class ReportList extends React.Component {

     constructor(props) {
       super(props);  
       this.state = {
         selectOptions: [],
         refreshChild: false
       };
    } 
 
    onFormSubmit = (event) => {
        event.preventDefault();
        this.sendData();
    };

    handleChange = (e) => {
        this.resetData();
        let target = e.target
        let name = target.name

        this.setState(state => {
            let value = Array.from(target.selectedOptions, option => option.value);
            return {
               [name]: value
            };
        })    
    }

    renderDates() {
      return (this.props.reportDates.map(d => {
            return (
                <option key={d.id} value={d.id}>{d.date}</option>
            );
        })
      )
    }

    sendData() {
        this.props.parentCallback(this.state.selectOptions);
    }

    resetData() {
        this.setState( state => {
            const selectOptions = [];
            return {
                selectOptions
            }
        })
    }

    render() {
        return(
          <div> 
            <form>  
                <div style={{ width: "100%", height: "500px"}}>
                    <div>
                        <div style={{ width: "100%", height: "100px", marginTop: "200px" }}>
                            <div>
                                <label htmlFor="date-select">Report Dates</label>
                            </div>
                            <div>
                                <select name="selectOptions" multiple={true} onChange={this.handleChange}  value={this.state.selectOptions}>
                                    <option value="">--Please choose an option--</option>
                                    {this.renderDates()}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* <h2>{this.state.selectOptions.join(', ')}</h2> */}
                    </div>
                    <div style={{ width: "100%", marginTop: "50px" }}>
                        <button onClick={this.onFormSubmit}>
                            Create Report
                        </button>
                        <button onClick={this.resetData}>
                            Reset Selection
                        </button>
                    </div>
                </div>
            </form>
          </div>    
        );
    }
}

export default ReportList;