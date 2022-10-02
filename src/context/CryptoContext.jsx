import { useContext, createContext, useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const GlobalContext = createContext();

export function useCryptoContext() {
	const context = useContext(GlobalContext);
	return context;
}

export default function ContextProvider({ children }) {
	const [productId, setProductId] = useState(["BTC-USD"]);
	const [bestBid, setBestBid] = useState([]);
	const [bestAsk, setBestAsk] = useState([]);
	const [time, setTime] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [OrderBookDetailsSells, setOrderBookDetailsSells] = useState([
		{
			product_id: productId ? productId : ["BTC-USD"],
			price: "0",
			last_size: "0",
			best_bid: "0",
			best_ask: "0",
		},
	]);
	const [OrderBookDetailsBuys, setOrderBookDetailsBuys] = useState([
		{
			product_id: productId ? productId : ["BTC-USD"],
			price: "0",
			last_size: "0",
			best_bid: "0",
			best_ask: "0",
		},
	]);

	const messagesEndRefBids = useRef(null);
	const messagesEndRefAsks = useRef(null);
	const messagesEndRefMarketSizeBids = useRef(null);
	const messagesEndRefMarketSizeAsks = useRef(null);
	const scrollToBottom = () => {
		messagesEndRefAsks.current.scrollIntoView({ behavior: "smooth" });
		messagesEndRefBids.current.scrollIntoView({ behavior: "smooth" });
		messagesEndRefMarketSizeAsks.current.scrollIntoView({ behavior: "smooth" });
		messagesEndRefMarketSizeBids.current.scrollIntoView({ behavior: "smooth" });
	};

	const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
		"wss://ws-feed.exchange.coinbase.com"
	);

	useEffect(() => {
		scrollToBottom();
	}, [
		messagesEndRefBids,
		messagesEndRefAsks,
		messagesEndRefMarketSizeBids,
		messagesEndRefMarketSizeAsks,
	]);

	useEffect(() => {
		// check if websocket is open
		if (readyState === ReadyState.OPEN) {
			sendJsonMessage({
				type: "subscribe",
				product_ids: productId,
				channels: ["ticker"],
			});
		}
	}, [productId, readyState, sendJsonMessage]);

	useEffect(() => {
		if (lastJsonMessage && lastJsonMessage?.product_id === productId[0]) {
			setTime((prevTime) => [
				...prevTime,
				lastJsonMessage.time.split("-")[2]?.substring(3, 18),
			]);
			setBestAsk((prevAsk) => [...prevAsk, lastJsonMessage.best_ask]);
			setBestBid((prevBid) => [...prevBid, lastJsonMessage.best_bid]);
			setChartData(formatDataForChart(time, bestBid, bestAsk));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastJsonMessage, productId]);

	useEffect(() => {
		if (lastJsonMessage?.side === "buy") {
			setOrderBookDetailsBuys((prev) => [
				...prev,
				{
					price: lastJsonMessage?.price,
					last_size: lastJsonMessage?.last_size,
					best_bid: lastJsonMessage?.best_bid,
				},
			]);
		}
		if (lastJsonMessage?.side === "sell") {
			setOrderBookDetailsSells((prev) => [
				...prev,
				{
					price: lastJsonMessage?.price,
					last_size: lastJsonMessage?.last_size,
					best_ask: lastJsonMessage?.best_ask,
				},
			]);
		}
		// scrollToBottom();
	}, [lastJsonMessage, setOrderBookDetailsBuys, setOrderBookDetailsSells]);

	const formatDataForChart = (time, bestBid, bestAsk) => {
		let arr = time.map((id, index) => {
			return { name: id, bid: bestBid[index], ask: bestAsk[index] };
		});
		return arr;
	};
	return (
		<GlobalContext.Provider
			value={{
				setProductId,
				sendJsonMessage,
				setBestAsk,
				setBestBid,
				time,
				lastJsonMessage,
				productId,
				chartData,
				bestAsk,
				bestBid,
				OrderBookDetailsBuys,
				OrderBookDetailsSells,
				messagesEndRefBids,
				messagesEndRefAsks,
				messagesEndRefMarketSizeBids,
				messagesEndRefMarketSizeAsks,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
