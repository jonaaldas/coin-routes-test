import CurrencySelectorCard from "./components/CurrencySelectorCard";
import CardGrid from "./components/CardGrid";
import Chart from "./components/Chart";
import OrderBook from "./components/OrderBook";
import { FaMoon, FaRegLightbulb } from "react-icons/fa";
import { useCryptoContext } from "./context/CryptoContext";
function App() {
	const { colorTheme, setTheme } = useCryptoContext();
	return (
		<div className='flex flex-col items-center dark:bg-gray-700'>
			<div className='grid grid-cols-3 grid-rows-2 h-screen w-4/6'>
				<div className='flex flex-col justify-center col-start-1 col-end-3'>
					<span
						onClick={() => setTheme(colorTheme)}
						className='transition duration-150'
					>
						{colorTheme === "dark" ? <FaMoon /> : <FaRegLightbulb />}
					</span>
					<h1 className='text-center text-2xl dark:text-white'>
						Select a Crypto Currency
					</h1>
					<CurrencySelectorCard />
					<CardGrid />
				</div>
				<div className='col-start-3 row-start-1 row-end-3 '>
					<OrderBook />
				</div>
				<div className='col-start-1 col-end-3'>
					<Chart />
				</div>
			</div>
		</div>
	);
}

export default App;
