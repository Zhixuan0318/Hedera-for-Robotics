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
