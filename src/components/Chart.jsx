import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
} from "recharts";
import { useCryptoContext } from "../context/CryptoContext";
function Chart() {
	const { chartData, productId } = useCryptoContext();
	// console.log(chartData);
	const range = () => {
		if (productId[0] === "ETH-USD") {
			return ["1325", "1335"];
		} else if (productId[0] === "BTC-USD") {
			return ["19170", "19205"];
		} else if (productId[0] === "LTC-USD") {
			return ["51", "55"];
		} else if (productId[0] === "BCH-USD") {
			return ["116", "120"];
		}
	};
	return (
		<ResponsiveContainer width='90%' height={300}>
			<LineChart width={500} height={300} data={chartData}>
				<XAxis dataKey='name' />
				<YAxis type='number' domain={range} />
				<CartesianGrid stroke='#eee' strokeDasharray='5 5' />
				<Line type='monotone' dataKey='bid' stroke='#8884d8' />
				<Line type='monotone' dataKey='ask' stroke='#82ca9d' />
			</LineChart>
		</ResponsiveContainer>
	);
}

export default Chart;
