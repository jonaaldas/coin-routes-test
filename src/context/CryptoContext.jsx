import { useContext, createContext, useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const GlobalContext = createContext();

export function useCryptoContext() {
	const context = useContext(GlobalContext);
	return context;
}

export default function ContextProvider({ children }) {
	const [productId, setProductId] = useState(["LTC-USD"]);
	const [bestBid, setBestBid] = useState([]);
	const [bestAsk, setBestAsk] = useState([]);
	const [time, setTime] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [changeIncrement, setChangeIncrement] = useState("");
	const [theme, setTheme] = useState("dark");
	const colorTheme = theme === "dark" ? "light" : "dark";
	const [OrderBookDetailsSells, setOrderBookDetailsSells] = useState([
		{
			price: "0",
			last_size: "0",
			best_bid: "0",
			best_ask: "0",
		},
	]);
	const [OrderBookDetailsBuys, setOrderBookDetailsBuys] = useState([
		{
			price: "0",
			last_size: "0",
			best_bid: "0",
			best_ask: "0",
		},
	]);

	const messagesEndRefAsks = useRef(null);
	const messagesEndRefMarketSizeAsks = useRef(null);
	const scrollToBottom = () => {
		messagesEndRefAsks.current.scrollIntoView();
		messagesEndRefMarketSizeAsks.current.scrollIntoView({ behavior: "smooth" });
	};

	const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
		"wss://ws-feed.exchange.coinbase.com"
	);

	useEffect(() => {
		scrollToBottom();
	}, [OrderBookDetailsSells, messagesEndRefAsks, messagesEndRefMarketSizeAsks]);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(colorTheme);
		root.classList.add(theme);
		// check if websocket is open
		if (readyState === ReadyState.OPEN) {
			sendJsonMessage({
				type: "subscribe",
				product_ids: productId,
				channels: ["ticker"],
			});
		}
	}, [productId, readyState, sendJsonMessage, theme]);

	useEffect(() => {
		if (lastJsonMessage && lastJsonMessage?.product_id === productId[0]) {
			setTime((prevTime) => [
				...prevTime,
				lastJsonMessage.time.split("-")[2]?.substring(3, 11),
			]);
			setBestAsk((prevAsk) => [...prevAsk, lastJsonMessage.best_ask]);
			setBestBid((prevBid) => [...prevBid, lastJsonMessage.best_bid]);
			setChartData(formatDataForChart(time, bestBid, bestAsk));
		}
	}, [lastJsonMessage, productId]);

	useEffect(() => {
		if (lastJsonMessage?.side === "buy") {
			setOrderBookDetailsBuys((prev) => [
				...prev,
				{
					price: lastJsonMessage?.price,
					last_size: lastJsonMessage?.last_size,
					best_bid: Number(lastJsonMessage?.best_bid),
				},
			]);
		}
		if (lastJsonMessage?.side === "sell") {
			setOrderBookDetailsSells((prev) => [
				...prev,
				{
					price: lastJsonMessage?.price,
					last_size: lastJsonMessage?.last_size,
					best_ask: Number(lastJsonMessage?.best_ask),
				},
			]);
		}
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
				setChangeIncrement,
				time,
				lastJsonMessage,
				productId,
				chartData,
				bestAsk,
				bestBid,
				OrderBookDetailsBuys,
				OrderBookDetailsSells,
				messagesEndRefAsks,
				messagesEndRefMarketSizeAsks,
				setTheme,
				colorTheme,
				theme,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
