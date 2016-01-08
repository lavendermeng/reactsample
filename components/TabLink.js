var React = require('react');
var classNames = require('classnames');

var TabLink = React.createClass({

    propTypes: {
		tabName: React.PropTypes.string.isRequired,
	},

    render: function(){
    	var tabName="";
        var tabClass = classNames({
            'tab':true,
            'active':this.props.activeTab
        })
    	if(this.props.tabIndex === 0){
    		tabName="ALL PRODUCTS";
    	}else{
    		tabName="PRODUCTS " + this.props.tabIndex;
    	}
		return (
			<li className={tabClass} name={this.props.tabName} onClick={this.props.onClick}>{tabName}</li>						
		);
	}

});

module.exports = TabLink;