import ReactDOM from 'react-dom';
import CartProvider from './store/CartProvider'; 
import './index.css';
import App from './App';

ReactDOM.render(<CartProvider><App /></CartProvider>, document.getElementById('root'));
