## How to use

Download the code and use npm install to install dependencies

    npm install

After use npm start to start local server

    npm start

![enter image description here](https://i.imgur.com/5Ogu0PC.png)

![enter image description here](https://i.imgur.com/SfMWL8l.png)

## Technologies used

I used the coin base **WebSocket API** to get the data for the order book, chart, and card
**Tailwindcss** for easy and fast styling
**React** to build the entire project
**Context API** as my state management tool to manage my state
**Recharts** to show the data in the chart

**How it works?**

I first get the data from the coinbase WebSocket API. I use react and use WebSocket library for ease of use. I check is the connection is open and send a JSON message with the data I want.
I use two channels from the coinbase API to get what I need. The ticket_batch channel gets real-time data of the best bids and asks every 5 milliseconds and the level2_batch channel gets the order book data.
![enter image description here](https://i.imgur.com/rZ1rUVc.png)

I created this card component to display the best bids and asks along with the price and the crypto currency we are displaying data for. The dropdown menu selects which type of cryptocurrency we are going to use.

I store this pair in a variable and pass it down to the context so that when the user selects it's choice its' stored and we can use it to send the JSON message to the server and get the data back.
![enter image description here](https://i.imgur.com/GZFyeqU.png)
![enter image description here](https://i.imgur.com/iem4rTD.png)

![enter image description here](https://i.imgur.com/47Q7Otg.png)

I used a second use effect to check if there is a localJsonMessage and I checked if the message is a ticker and the productID is the one I selected from the card component (read above).  
If everything is true we store the data in different states and we also create a chart array of data to display in the chart.
After all the data stored I pass it down to the card component and display it.
![enter image description here](https://i.imgur.com/DKl4SIA.png)

The second useEffect check whether the data received is a level2 type, if so we store it in tow states one for bids and one for asks then we display it in the OrderBook component.
![enter image description here](https://i.imgur.com/QV93508.png)

OrerBook Component

![enter image description here](https://i.imgur.com/1LPWxUL.png)

If you have any questions please email me at me@jonathanaldas.com

Take a look at these couple examples that I have in my own portfolio:

**Transaction Management App:** https://github.com/alecortega/palettable

**Sweet Treats (Hackathon Win):** https://github.com/jonaaldas/Hackathon-sweet-treats-heroku
