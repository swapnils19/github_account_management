import React from "react"
import PropTypes from "prop-types"
class HelloWorldAgain extends React.Component {
  render () {
    return (
      <React.Fragment>
        Again: {this.props.greeting}
      </React.Fragment>
    );
  }
}

HelloWorldAgain.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorldAgain
