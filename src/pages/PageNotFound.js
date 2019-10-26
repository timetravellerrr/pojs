import React, { Component } from 'react';

class PageNotFound extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="container">
          {this.render_content()}
        </div>
      </React.Fragment>
     )
  }
  
  render_content = () => {
      return (<div className="alert alert-danger">Page Not Found</div>);
  }
}

export default PageNotFound;

