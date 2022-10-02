import { useCryptoContext } from "../context/CryptoContext";
function OrderBook() {
	const {
		OrderBookDetailsBuys,
		OrderBookDetailsSells,
		lastJsonMessage,
		messagesEndRefBids,
		messagesEndRefAsks,
		messagesEndRefMarketSizeBids,
		messagesEndRefMarketSizeAsks,
	} = useCryptoContext();
	console.log(messagesEndRefBids);
	return (
		<div>
			<div id='header' className='flex items-center bg-gray-100 h-10 px-4'>
				<div className='w-2/4 font-semibold'>Market Size</div>
				<div className='w-2/4 font-semibold'>Price USD</div>
			</div>

			<div id='body' className='px-4 space-y-4'>
				<div className='flex '>
					<div className='max-h-64 overflow-auto'>
						{OrderBookDetailsSells.map((asks, i) => {
							return <p key={i}>{asks.last_size}</p>;
						})}
						<div ref={messagesEndRefAsks}></div>
					</div>
					<div className='max-h-64 overflow-auto'>
						{OrderBookDetailsSells.map((asks, i) => {
							return <p key={i}>{asks.best_ask}</p>;
						})}
						<div ref={messagesEndRefMarketSizeAsks} />
					</div>
				</div>
			</div>
			<hr />
			<div>{lastJsonMessage?.price}</div>
			<hr />
			<div id='body' className='px-4 space-y-4'>
				<div className='flex '>
					<div className='max-h-64 overflow-auto'>
						{OrderBookDetailsBuys.map((bid, i) => {
							return <p key={i}>{bid.last_size}</p>;
						})}
						<div ref={messagesEndRefBids}></div>
					</div>
					<div className='max-h-64 overflow-auto'>
						{OrderBookDetailsBuys.map((bid, i) => {
							return <p key={i}>{bid.best_bid}</p>;
						})}
						<div ref={messagesEndRefMarketSizeBids}></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderBook;
