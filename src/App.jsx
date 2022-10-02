import ContextProvider from "./context/CryptoContext";
import CurrencySelectorCard from "./components/CurrencySelectorCard";
import CardGrid from "./components/CardGrid";
import Chart from "./components/Chart";
import OrderBook from "./components/OrderBook";

function App() {
	return (
		<>
			<ContextProvider>
				<div className='flex flex-col items-center'>
					<h1 className='text-black text-3xl'>Pick your currency</h1>
					<CurrencySelectorCard />
					<CardGrid />
					<Chart />
					<OrderBook />
				</div>
			</ContextProvider>
		</>
	);
}

export default App;
