var React = require('react');

var Header = React.createClass({

	propTypes: {
		title: React.PropTypes.string.isRequired
	},

	getDefaultProps() {
		return {
			status: 'disconnected'
		}
	},

	render() {
		return (
			<header className="myHeader">
			<div className="logo"></div>
				<div className="col-xs-2">
					<span id="connection-status" className={this.props.status}></span>
				</div>
			</header>
		);
	}

});

module.exports = Header;