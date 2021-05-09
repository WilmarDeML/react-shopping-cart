// feature 1
import React, {useState} from 'react';
import Products from './components/Products';
import Filter from './components/Filter'
import data from './data.json';

const App = () => {
  const [state, setState] = useState({
    products: data.products,
    size: '',
    sort: ''
  });

  const filterProducts = e => {
    !e.target.value ?
      setState({products: data.products, size: e.target.value})
    :
      setState({
        products: data.products.filter(
          product => product.availableSizes.indexOf(e.target.value) >= 0
        ),
        size: e.target.value
      });
  }
  const sortProducts = e => {
    console.log(e.target.value);
    const sort = e.target.value;
    setState( state => ({
      products: state.products.slice().sort( (a, b) => 
        sort === 'lowest' ? 
          a.price > b.price ? 1 : -1
        : sort === 'highest' ?
            a.price < b.price ? 1 : -1
        : a._id > b._id ? 1 : -1 
      ),
      sort: sort
    }))
  }
  return (
    <div className="grid-container">
      <header>
        <a href='/'>React Shopping Cart</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Filter count={state.products.length}
              size={state.size}
              sort={state.sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
             />
            <Products products={state.products} />
          </div>
          <div className='sidebar'>Cart Items</div>
        </div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  );
}

export default App;
