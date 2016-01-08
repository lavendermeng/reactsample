var React = require('react');

var Product = React.createClass({

	propTypes: {
		id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string,
        image: React.PropTypes.string,
        price: React.PropTypes.number
	},

	render() {

        var name = this.props.name? this.props.name : "Unknown";
        var imageSrc = "images/products/" + this.props.image;
		return (
			<div className="my-item col-md-3">
			    <div className="img-box">
			         <img src={imageSrc} alt="images/product_default" title={name} />
                </div>
			    <h5>{name}</h5>
                <h5>Price....................{this.props.price}</h5>
			</div>
		);
	}

});

module.exports = Product;
