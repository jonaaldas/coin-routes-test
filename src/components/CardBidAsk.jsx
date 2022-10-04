import { useCryptoContext } from "../context/CryptoContext";
function CardBidAsk() {
	const { price, bestBid, bestAsk, productId } = useCryptoContext();
	return (
		<div className='flex w-full justify-center'>
			<div className='items-center w-9/12 rounded overflow-hidden shadow-lg px-6 py-4 dark:bg-gray-600'>
				<div className='flex justify-around'>
					<h3 className='dark:text-white'>{productId}</h3>
					<h3 className='dark:text-white'>Price: {price}</h3>
				</div>
				<div className='flex justify-center'>
					<div className='px-6 py-4'>
						<div className='font-bold text-xl mb-2 dark:text-white'>
							Best Bid
						</div>
						<p className='dark:text-white'>
							Bid Price:
							<span className='text-green-800 dark:text-green-900'>
								{bestBid[bestBid.length - 1]}
							</span>
						</p>
					</div>
					<div className='px-6 py-4'>
						<div className='font-bold text-xl mb-2 dark:text-white'>
							Best Ask
						</div>
						<p className='dark:text-white'>
							Bid Ask:
							<span className='text-rose-600'>
								{bestAsk[bestAsk.length - 1]}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardBidAsk;
