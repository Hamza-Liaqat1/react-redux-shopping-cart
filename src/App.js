import React from 'react';
import data from './data.json'
import Products from './components/Products';
import Filter from './components/Filter';


class App extends React.Component {
  constructor(){
    super();
    this.state={
      products: data.products,
      size: "",
      sort:""
    }
  }
  
sortProduct= (event) => {
  const sort = event.target.value;
  console.log(event.target.value)

  this.setState({
    sort: sort,
    products: this.state.products
    .slice()
    .sort((a,b) => 
      sort === "lowest" 
      ? a.price > b.price 
      ? 1
      :-1
      : sort === "highest"
      ? a.price < b.price 
      ? 1
      :-1
      : a._id < b._id 
      ? 1
      : -1
    ),
  })
}
filterProduct = (event) =>{
console.log(event.target.value)
if(event.target.value === ""){    //if the value is empty when we will select option to All which is empty
  this.setState({
    size: event.target.value,  //this will apply here when size will set to All
    products: data.products    
  })
}
else{
this.setState({
  size: event.target.value,
  products: data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
})
}
}


  render(){
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter count={this.state.products.length} 
            size={this.state.size}
            sort={this.state.sort}
            filterProduct={this.filterProduct}
            sortProduct={this.sortProduct}
            />
            <Products products={this.state.products} />
          </div>
          <div className="sidebar">
            cart item
          </div>
        </div>
      </main>
      <footer>
        All right is reserved
      </footer>
    </div>
  );
  }
}

export default App;
