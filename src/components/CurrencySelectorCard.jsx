import { useCryptoContext } from "../context/CryptoContext";

function CurrencySelectorCard() {
	const { setProductId, sendJsonMessage, productId, setBestAsk, setBestBid } =
		useCryptoContext();
	const handleChange = (e) => {
		sendJsonMessage({
			type: "unsubscribe",
			product_ids: productId,
			channels: ["ticker"],
		});
		setBestAsk([]);
		setBestBid([]);
		setProductId([e.target.value]);
	};

	return (
		<>
			<form className='flex justify-center p-2'>
				<select
					id='currencies'
					onChange={(e) => handleChange(e)}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
				>
					<option defaultValue value='LTC-USD'>
						LTC-USD
					</option>
					<option value='BTC-USD'>BTC-USD</option>
					<option value='ETH-USD'>ETH-USD</option>
					<option value='BCH-USD'>BCH-USD</option>
				</select>
			</form>
		</>
	);
}

export default CurrencySelectorCard;
