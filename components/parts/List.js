var React = require('react');
var $ = require('jquery');
var classNames = require('classnames');

var Product = require('../Product');
var TabLink = require('../TabLink');

var List = React.createClass({
  getInitialState: function() {
	    return {
	      categories: [],
	      products: [],
        activeTab:0,
        category:"All Products",
        activeFilter:""
	    };
  },
  filterByCategory:function(i,name){
    var productsList = this.state.data.map(function(obj){
        return obj.products;
    });
    if(i>0){
        this.setState({
          products: productsList[i-1],
          activeTab:i,
          category:name,
          activeFilter:""
        });
    }else{
        var allProducts = [];
        productsList.forEach(function(list){
           list.forEach(function(product){
           allProducts.push(product);
        });
      });
        this.setState({
          products: allProducts,
          activeTab:i,
          category:"All Products",
          activeFilter:""
        });
    }
  },  
  lth:function(e){
    e.preventDefault();
    var productsList = this.state.products;
    var lowToHigh = function(a,b) {
      if (a.price < b.price)
         return -1;
      if (a.price > b.price)
         return 1;
      return 0;
    };
    productsList.sort(lowToHigh);
    this.setState({
      products:productsList,
      activeFilter:" > Filter By Price(low to high)"
    });
  },
  htl:function(e){
    e.preventDefault();
    var productsList = this.state.products;
    var highToLow = function(a,b) {
      if (a.price < b.price)
         return 1;
      if (a.price > b.price)
         return -1;
      return 0;
    };
    productsList.sort(highToLow);
    this.setState({
      products:productsList,
      activeFilter:" > Filter By Price(high to low)"
    });
  },
  filterByAlphabetic:function(e){
    e.preventDefault();
    var productsList = this.state.products;
    productsList.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    this.setState({
        products:productsList,
        activeFilter:" > Filtered Alphabetically"
    });
  },

  componentDidMount: function() {
    var ref = "data/data.json";
    $.get(ref, function(data) {
      var categoryList= data.map(function(obj){
           return obj.category;
      });
      var productsList = data.map(function(obj){
      	return obj.products;
      });
      var allProducts = [];
      productsList.forEach(function(list){
          list.forEach(function(product){
            allProducts.push(product);
          });
      });
      categoryList.unshift("All Products");

      if (this.isMounted()) {
        this.setState({
          data:data,
          categories: categoryList,
          products: allProducts 
        });
      }

    }.bind(this));
  },
    render:function() {
		var navs = []; 
    for(var i = 0;i<this.state.categories.length;i++){
      var boundClick = this.filterByCategory.bind(this, i,this.state.categories[i]); 
      var active = (this.state.activeTab===i);         
      navs.push(<TabLink activeTab={active} tabName={this.state.categories[i]} tabIndex = {i} key={i} onClick={boundClick}/>);
    }   
    var products =[];
    this.state.products.forEach(function(product){
         products.push(
             <Product key={product.id} id={product.id} name={product.name} price={product.price} image={product.image} />     
          );  
    });
		return (
			    <div className="content-row row">
				    <div className="nav-bar">                 
                {navs}
            </div>
            <div className="breadcrumb-row">
              <span className="category">{this.state.category}</span>

              <span className="filter">{this.state.activeFilter}</span>
            </div>
            <div className="products-row">
              <div className="list col-md-10">{products}</div>
              <div className="col-md-2 filter-bar">
                  <span>Filter By:</span>
                  <a href="#" onClick={this.filterByAlphabetic}>Alphabetically</a>
                  <a href="#" onClick={this.lth}>Price:Low to High</a>
                  <a href="#" onClick={this.htl}>Price:High to Low</a>
              </div>
            </div>  	
				  </div>				
			);
	}

});

module.exports = List;