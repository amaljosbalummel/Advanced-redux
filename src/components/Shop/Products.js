import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DUMMY_DATA=[{
  id:'p1',
  price:40,
  title:'pen',
  description:'blue one'
},
{
  id:'p2',
  price:50,
  title:'book',
  description:'classmate one'
},{
  id:'p3',
  price:30,
  title:'mouse',
  description:'black one'
}];


const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map((product)=>  <ProductItem
        key={product.id}
        id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />)}
       
      </ul>
    </section>
  );
};

export default Products;
