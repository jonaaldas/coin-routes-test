import { useCryptoContext } from "../context/CryptoContext";
function CardBid() {
	const { lastJsonMessage, productId } = useCryptoContext();
	return (
		<div className='items-center w-5/12 rounded overflow-hidden shadow-lg px-6 py-4'>
			<div className='flex justify-around'>
				<h3>{productId}</h3>
				<h3>Price: {lastJsonMessage?.price}</h3>
			</div>
			<div className='flex justify-center'>
				<div className='px-6 py-4'>
					<div className='font-bold text-xl mb-2'>Best Bid</div>
					<p>
						Bid Price:
						<span className='text-green-800'>{lastJsonMessage?.best_bid} </span>
					</p>
				</div>
				<div className='px-6 py-4'>
					<div className='font-bold text-xl mb-2'>Best Ask</div>
					<p>
						Bid Ask:
						<span className='text-rose-600'>{lastJsonMessage?.best_ask}</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default CardBid;
