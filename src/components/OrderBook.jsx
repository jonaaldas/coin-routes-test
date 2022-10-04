import { useCryptoContext } from "../context/CryptoContext";
function OrderBook() {
	const {
		OrderBookDetailsBuys,
		OrderBookDetailsSells,
		lastJsonMessage,
		messagesEndRefAsks,
		messagesEndRefMarketSizeAsks,
		setChangeIncrement,
	} = useCryptoContext();

	const spread = Math.abs(
		Number(lastJsonMessage?.best_bid) - Number(lastJsonMessage?.best_ask)
	);

	const handleChange = (e) => {
		let convertion = Number(e.target.value);
		setChangeIncrement(convertion);
	};

	let reverseDataBids = OrderBookDetailsBuys.reverse();
	return (
		<div className='h-full'>
			<div
				id='header'
				className='flex items-center justify-center bg-gray-100 h-10 px-4'
			>
				<div className='w-2/4 font-semibold flex justify-center'>
					Market Size
				</div>
				<div className='w-2/4 font-semibold flex justify-center'>Price USD</div>
				{/* <div>
					<select name='aggrigation' id='agr' onChange={(e) => handleChange(e)}>
						<option defaultValue value='0.001'>
							0.01
						</option>
						<option value='0.05'>0.05</option>
						<option value='0.010'>0.10</option>
					</select>
				</div> */}
			</div>

			<div id='body' className='border min-h-mid px-4 space-y-4'>
				<div className='flex'>
					<div className='max-h-72 overflow-auto min-h-mid w-full text-center'>
						{OrderBookDetailsSells.map((asks, i) => {
							return (
								<p className='dark:text-white' key={i}>
									{asks.last_size}
								</p>
							);
						})}
						<div ref={messagesEndRefAsks} />
					</div>
					<div className='max-h-72 overflow-auto min-h-mid w-full text-center'>
						{OrderBookDetailsSells.map((asks, i) => {
							return (
								<p key={i} className='text-red-400'>
									{asks.best_ask}
								</p>
							);
						})}
						<div ref={messagesEndRefMarketSizeAsks} />
					</div>
				</div>
			</div>
			<hr />
			<div className='flex justify-around'>
				<span className='dark:text-white'>{lastJsonMessage?.price}</span>
				<span className='dark:text-white'>Spread {spread.toFixed(4)}</span>
			</div>
			<hr />
			<div id='body' className='border px-4 space-y-4'>
				<div className='flex '>
					<div className='max-h-64 overflow-auto min-h-mid w-full text-center'>
						{reverseDataBids.map((bid, i) => {
							return (
								<p className='dark:text-white' key={i}>
									{bid.last_size}
								</p>
							);
						})}
					</div>
					<div className='max-h-64 overflow-auto min-h-mid w-full text-center'>
						{reverseDataBids.map((bid, i) => {
							return (
								<p key={i} className='text-green-500'>
									{bid.best_bid}
								</p>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderBook;
