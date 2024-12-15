# Code Submission Breakdown

### Project Folder Structure

Our team's code submission able to split into **three major parts** in our demo:

1. 📦`dapp-demo`: All the DApp related and Hedera blockchain interaction code
2. 📦`contract`: All the contracts we wrote for this demo and deployed on Hedera
3. 📦`robot-sim`: All the robotic simulation setup and connection layer code

```bash
📦dapp-demo
┣ 📂public
┣ 📂src
.....┣ 📂app
..........┣ 📂api
...............┣ 📂hedera
....................┣ 📂consensus
....................┣ 📂file-service
....................┣ 📂token
...............┣ 📂order
...............┗ 📂robot
....................┣ 📂simulate
...............┗ 📂worldcoin-verify
..........┣ 📂home
...............┣ 📂inventory
...............┣ 📂store
...............┗ 📂track
...............┗ 📂delivery
..........┣ 📂order-deliver
...............┣ 📂pre-attestation
...............┗ 📂attestation
..........┣ 📂order
...............┣ 📂approval
...............┗ 📂simulator
.....┣ 📂class
.....┣ 📂components
.....┣ 📂config
.....┣ 📂context
.....┣ 📂contracts ABI
.....┣ 📂data
.....┣ 📂helpers
.....┣ 📂hooks
.....┣ 📂lib
.....┣ 📂services
.....┗ 📂utils


-------------------------------------

📦contract
┣ 📂hedera-contracts

-------------------------------------
📦robot-sim
┣ 📂_pycache_
┣ 📂robot-controllers
┣ 📂connectivity-layer-server
┣ 📂robot-status-memory
┣ 📂robot-part-stl
┣ 📂templates
┣ 📂webot-world-setup

```

### DApp-Demo `src` Folder Description

📂`app/api/hedera`: APIs related to interaction with Hedera Consensus Service (for ADDA mechanism), Hedera File Service (for lifecycle report and photo evidence), and tokenization of three products with Hedera Token Service.

📂`app/api/order`: API for processing orders

📂`app/api/robot`: API for controlling robot simulations (local or online embedded)

📂`app/api/worldcoin-verify`: API for managing World ID verification with IDKit and Cloud Verify by World ID (for the Recipient Verification Mechanism)

📂`app/home`: Client interface for store page (purchase products), track page (order tracking), inventory page (admin for monitoring stock levels), delivery page (simulation of physical distribution of order)

📂`app/order-deliver`: Managing the ADDA mechanism (pre-attestation verification check with World ID, attestation phase with Hedera Consensus Service and Hedera File Service)

📂`app/order`: Run Webots simulations, multi-signature mechanism, keep track Activity Verifier of each phase, perform order lifecycle on-chain, manage order state, detail on-chain log, render order page UI components

📂`class`: HederaContract class is used to interact with all the order fulfilment process via smart contracts and run the order fulfilment lifecycle

📂`components`: Some reusable frontend UI components are stored here (cards, toast, styling)

📂`config`: Database and wagmi configuration

📂`context`: Manage wallet connection and update order context through DApp

📂`contracts ABI`: ABI of respective contract, refer to hedera-contracts section for contracts info

📂`data`: contract addresses and ID, detail log template, product collection data, customer-info rand value (a randomizer for faster demo purpose)

📂`helpers`: Helper function for order stage processing

📂`hooks`: For add,retrieve,updating orders + smart contract event listening, checking event logs, syncing order status, update data in each phase in cycle + load products, refresh stock info and update, fetch on-chain stock info

📂`services`: All firebase db interaction

📂`utils`: Hedera File Service (generating lifecycle report), owner account, customer info random generator (built for faster demo purpose), unique off-chain order reference generator: using user wallet address and time
