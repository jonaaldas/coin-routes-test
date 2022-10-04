import { useContext, createContext, useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const GlobalContext = createContext();

export function useCryptoContext() {
	const context = useContext(GlobalContext);
	return context;
}

export default function ContextProvider({ children }) {
	const [productId, setProductId] = useState(["LTC-USD"]);
	const [price, setPrice] = useState();
	const [bestBid, setBestBid] = useState([]);
	const [bestAsk, setBestAsk] = useState([]);
	const [time, setTime] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [changeIncrement, setChangeIncrement] = useState(0.01);
	const [theme, setTheme] = useState("dark");
	const messagesEndRefAsks = useRef(null);
	const messagesEndRefMarketSizeAsks = useRef(null);

	const colorTheme = theme === "dark" ? "light" : "dark";

	const [orderBookDetailsAsks, setOrderBookDetailsAsks] = useState([
		{
			price: "0",
			last_size: "0",
			best_ask: "0",
		},
	]);
	const [orderBookDetailsBids, setOrderBookDetailsBids] = useState([
		{
			price: "0",
			last_size: "0",
			best_bids: "0",
		},
	]);

	const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
		"wss://ws-feed.exchange.coinbase.com"
	);

	// to scroll to the bottom of the orderbook
	useEffect(() => {
		scrollToBottom();
	}, [orderBookDetailsAsks, messagesEndRefAsks, messagesEndRefMarketSizeAsks]);

	// reqeusting data form the coinbase
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(colorTheme);
		root.classList.add(theme);
		// check if websocket is open
		if (readyState === ReadyState.OPEN) {
			sendJsonMessage({
				type: "subscribe",
				product_ids: productId,
				channels: ["level2_batch", "ticker_batch"],
			});
		}
	}, [colorTheme, productId, readyState, sendJsonMessage, theme]);

	// useEffect for ticker_batch, card and chart
	useEffect(() => {
		if (
			lastJsonMessage &&
			lastJsonMessage.type === "ticker" &&
			lastJsonMessage?.product_id === productId[0]
		) {
			setPrice(lastJsonMessage?.price);
			setTime((prevTime) => [
				...prevTime,
				lastJsonMessage.time.split("-")[2]?.substring(3, 11),
			]);
			setBestAsk((prevAsk) => [...prevAsk, lastJsonMessage?.best_ask]);
			setBestBid((prevAsk) => [...prevAsk, lastJsonMessage?.best_bid]);
			setChartData(formatDataForChart(time, bestBid, bestAsk));
		}
	}, [bestAsk, bestBid, lastJsonMessage, productId, time]);

	// for Order Book
	useEffect(() => {
		if (
			lastJsonMessage &&
			lastJsonMessage.type === "l2update" &&
			lastJsonMessage?.product_id === productId[0]
		) {
		}
		let changes = lastJsonMessage?.changes;
		let innerChanges = changes ? changes[0] : undefined;
		let side = innerChanges ? innerChanges[0] : undefined;
		if (side === "sell" && lastJsonMessage?.product_id === productId[0]) {
			setOrderBookDetailsAsks((prev) => [
				...prev,
				{
					price: price,
					last_size: innerChanges[2],
					best_ask: Number(innerChanges[1]).toFixed(2) + changeIncrement,
				},
			]);
		}
		if (side === "buy" && lastJsonMessage?.product_id === productId[0]) {
			setOrderBookDetailsBids((prev) => [
				...prev,
				{
					price: price,
					last_size: innerChanges[2],
					best_bids: Number(innerChanges[1]).toFixed(2) + changeIncrement,
				},
			]);
		}
	}, [changeIncrement, lastJsonMessage, price, productId]);

	// creating array of obj for the chart
	const formatDataForChart = (time, bestBid, bestAsk) => {
		let arr = time.map((id, index) => {
			return { name: id, bid: bestBid[index], ask: bestAsk[index] };
		});
		return arr;
	};

	const scrollToBottom = () => {
		messagesEndRefAsks.current.scrollIntoView({ behavior: "smooth" });
		messagesEndRefMarketSizeAsks.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<GlobalContext.Provider
			value={{
				setProductId,
				sendJsonMessage,
				setBestAsk,
				setBestBid,
				setChangeIncrement,
				setTheme,
				time,
				price,
				lastJsonMessage,
				productId,
				chartData,
				bestAsk,
				bestBid,
				orderBookDetailsBids,
				orderBookDetailsAsks,
				messagesEndRefAsks,
				messagesEndRefMarketSizeAsks,
				colorTheme,
				theme,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
