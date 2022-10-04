import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
	Legend,
	Tooltip,
} from "recharts";
import { useCryptoContext } from "../context/CryptoContext";
function Chart() {
	const { chartData, theme } = useCryptoContext();

	return (
		<ResponsiveContainer width='95%' height={300}>
			<LineChart width={500} height={300} data={chartData}>
				<Legend />
				<Tooltip />
				<XAxis
					dataKey='name'
					angle={-50}
					padding={{ left: 10 }}
					stroke={theme === "dark" ? "white" : "black"}
				/>
				<YAxis
					type='number'
					domain={["auto", "auto"]}
					stroke={theme === "dark" ? "white" : "black"}
				/>
				<CartesianGrid stroke='#eee' strokeDasharray='5 5' />
				<Line
					type='monotone'
					dataKey='bid'
					stroke='rgb(124 58 237)'
					strokeWidth={2}
				/>
				<Line
					type='monotone'
					dataKey='ask'
					stroke='rgb(34 211 238)'
					strokeWidth={2}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}

export default Chart;
