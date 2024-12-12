<div align="center">
    <img src="https://github.com/user-attachments/assets/02159f3d-fffa-4320-ab36-ae46f65f2518" width=200>
    <h1>Hedera for Robotics</h1>
    <strong>Connecting Industrial Robotic Automation to Hedera</strong>  
</div>

<br>

![Frame 64 (5)](https://github.com/user-attachments/assets/78371639-5ed8-4908-aa2f-cdb06f846e2a)

## 📦 Our Deliverables

1. Our 6 mins+ Demo Video (Youtube) [🌐Watch It!](https://youtu.be/Ip_Jv98Glu8)
2. Our Pitch Deck (PDF Download) [🌐Read It!]()
3. Our Demo DApp (Deployed on Hedera Testnet) [🌐Try It!](https://hedera-for-robotics.vercel.app/)

### Extra: Code Submission Breakdown 📃
For the convenience of the technical judges, our team has organized the code submission by breaking down the structure and providing descriptions for each folder and important files. You can access the documentation folder [🌐here]() !

<br>

## 👊 Problem We're Tackling

![Slide5](https://github.com/user-attachments/assets/ce9a77ac-145f-4aa8-9e67-4141d2f68301)

Data centralization is one of the key issue when industries are operating their robotic automation in a web2-based infrastructure setup. Industries often adopt distributed manufacturing strategy which form a complex supply chain and involve various stakeholders and manufacturing units spreading in different locations. Hence, in a web2-based robotic infrastructure, each parties are actually siloed, as the data systems are disjoint, causing information asymmetry. In other words, A robot system in one factory may collect data that are not shared with robots in another factory, making it difficult to get a unified view of operations. The problems which arises will be:

#### ❌ Data is not Transparent: 

Factories and warehouses operating their robotic fleets in an isolated data systems or across various locations, will create a "visibility gap" that limits transparency and access to real-time operational data for stakeholders.
   
#### ❌ Low Efficiency + Track and Trace Challenge: 

Workflow efficiency suffers due to the complex data integration processes that slow decision-making and create operational bottlenecks. This lack of transparency also complicates essential tasks like tracking the history of production or the origin of raw materials, even among connected facilities. The underlying reason is the lack of clear auditing trials which can be easily access, and this is a classic problem in supply chain sector.
   
#### ❌ Security Concerns: 

Security concerns are heightened in Web2 environments, where mutable data is vulnerable to tampering and counterfeiting, which is considered a damage to the supply chain trust. Additionally, the risk of a single point of failure can lead to significant disruptions, cascading through the entire robotic automation operation.

## 💡 Inspirations: Really Motivated Us!

To address the problems, letting current industries robotic setup to transition and utilise a Hedera-connected distributed data system is a smart move. The intuition behind is simple: Every action taken by a robot in a factory is recorded on the blockchain, making product movement, quality checks, and production steps fully transparent, traceable, verifiable, and tamper-resistant, significantly enhancing security and auditability for all supply chain stakeholders. Our team had included this in our demo video, don't miss it!

#### ⭐ Key Benefits for Industries: 

1. Full traceability and auditability
2. Data are immutable and highly secure
3. Full flexibility, either partially or fully shifting to Hedera
4. Smart contracts for automated and secure control of robotic fleet operations
5. Ready-made Hedera services for on-chain components setup
6. Resilient robotic network for industry
7. Vendor independence. No more traditional vendor-locked-in system
8. Reducing long term cost for Web2 infrastructure maintenance.

## ⚔️ Existing Solutions and Challenges

Existing solutions for implementing robotic automation in industries include a variety of software platforms (such as Gazebo and Webots), industry-specific solutions (like those from ABB, KUKA, and Fanuc), and integration tools (including ROS, AWS IoT, and Microsoft Azure IoT Hub). However, challenges emerge when considering the implementation of Web3 solutions in robotic automated operations. A significant hurdle is that the Hedera ecosystem lacks robotics-related development tools to facilitate the integration of blockchain solutions with existing legacy systems, which are often incompatible.

>  A simple example: while developing a prototype for our demo, we found that no industry-grade robotic simulators offer tools for easily interacting with Hedera events to conduct simulations.

☹️☹️☹️ Although industries can create their own tools or middleware for Web3 integration, this approach can be costly, time-consuming, and resource-intensive. We need a solution to bridge the gap between industry robotic automation (web2 layer) and the Hedera ecosystem (web3 layer).

Here is a concept illustration:

![Slide9](https://github.com/user-attachments/assets/3ed284bc-6eb1-4a5f-8656-11ba4d961875)


## 💪 We launch Hedera for Robotics, focusing on robots (Our Solution)

Hence, our team decided to launch Hedera for Robotics as the first B2B Middleware-as-a-Service (MaaS) provider, assisting industries across various sectors with industrial robotic automation by designing and developing a custom API hub. This hub acts like a bridge, which connects all components in their robotic automation setup architecture to the Hedera ecosystem. The benefit of using a custom middleware hub is that all of the important layers in the Web2-based robotic automation systems such as the factory floor (physical hardwares and robotics), IoT connectivity layer, security layer and also control and management layer, able to interact with the blockchain layer component easily (which involve on-chain assets, Hedera services, accounts, smart contract or any on-chain tooling integration). Our hub will now become the common interface for industries to connect all robotic components built by different language, framework, hardware, and communication protocol into a unified Web3 system on Hedera. Below is a high-level architecture overview of a custom hub in a industry robotic setup:

### Introduce the concept of Hub - Architecture Overview

![Slide11](https://github.com/user-attachments/assets/58a0cd93-d89f-42ed-bbcd-1b7d1bfba962)

### Why custom, not a “one-size-fits-all” solution❓

Our role is crucial because industrial robotic architectures are often complex and highly customized. Each industry has unique operational needs, diverse technologies, and specific regulatory requirements, making a one-size-fits-all approach impractical. That's why we offer tailored solutions, enabling industries to integrate Hedera Web3 infrastructure efficiently, which aligns perfectly with our product-market fit. This approach not only saves significant time for indsutries but also reduces costs.

![Slide13](https://github.com/user-attachments/assets/6ed89aef-da41-42af-9aa2-f8dcd7906607)

As a B2B (business-to-business) service provider, we are proud to be the first to offer this service on Hedera. In one of our future milestone (have a look in our pitch deck), Hedera for Robotics will also serve as a key driver in introducing a comprehensive ecosystem of industry-specific robotic development tools to the Hedera community as part of our ongoing service journey.

## How we helps our industry clients? (Not Limited To)

- **🏭 Manufacturing:** Increase data transparency for supply chain track-and-trace by manage production line robotic automation on Hedera.

- **🚚 3PL (Third Party Logistics) and Ecommerce:** Allow real time order processing and parcel tracking by integrating warehouse robotic systems like Autonomous Mobile Robots (AMR) on Hedera.

- **🧬 Pharmaceutical and Biotech:** Record robotic operations on Hedera during drug operation to ensure compliance with regulatory standards (e.g., FDA).

- **🍄 Agriculture and Farming:** Creating data records of crop generated by agriculture robotics automation system for better food traceability.

## Proof of Concept: An Implementation Prototype

The implementation prototype we showcase in the demo video is built using the hub architecture concept that we proposed, which able to operate a robotic-powered small scale ecommerce-warehouse supply chain cycle. Further proving the feasibility of utilising Hedera solutions to solve real world industry problem in our project. Below attached is a high-level architecture diagram of our ecommerce-warehouse demo setup, which our custom hub being the most crucial middleware component:

![Slide15](https://github.com/user-attachments/assets/94bbf3ea-68d6-4682-80f9-02bc0f25c1ea)

Clients can connect to our store DApp on Hedera testnet with Wallet Connect to order products. Before the order is confirmed and pass to the fulfilment stage, client will undergo a recipient verification mechanism which will bind his/her identity to the order and able to verify the identity of the recipient during the physical delivery. Client need to connect a World ID to an incognito action which will generate a proof and will verify it with World Cloud Verification, then obtained a nullifier hash representing his identity which will bind to the order. 

![image](https://github.com/user-attachments/assets/c5437517-f742-4370-94f2-5ce36dd85ec9)

Now, the order will be processed by our storefront smart contract and passed to the warehouse smart contract. The warehouse contract assigns a robot for each operation. There are three robots in the setup: a picking robot, a packing robot, and a delivery robot, each powered by its own individual smart contract. Worth mentioning, all smart contract automated components were setup using Hedera Smart Contract Service (HSCS). 

![image](https://github.com/user-attachments/assets/a152627f-1e5a-424e-bb11-12f82bbc8654)

The native Hedera randomness precompile then is used to select one robot from the fleet for each operation, a process known as load balancing.

So, with our hub, industry can directly plug and play different professional simulators and test the whole operation with the integration of Hedera. For our demo, we designed a warehouse operation that includes picking, packing, and delivering. We built a simulation using Webot and embedded it in our demo for seamless interaction with Hedera. When each robot completes a task in the simulation, it logs the action on Hedera, and the warehouse will trigger the next operation. For example, when a client orders a green cube, the picking order is assigned to a picking robot on Hedera, and the picking robot in the simulation will perform the task. After each robot completes its assigned task, it logs the action on Hedera, and the warehouse contract triggers the next packing operation.

![image](https://github.com/user-attachments/assets/08448b21-d20e-4892-9563-b696248dc3fb)

In a Human-Robot Collaborative Environment, which requires close supervision from human operators (for example, quality checks on tasks performed by robots), post-action approvals can be facilitated using a multi-signature mechanism on Hedera, creating an efficient feedback loop in a checkpoint-based workflow. For example, when the packing task is completed by the packing robot, a human operator with their own EOA (Externally Owned Account) will act as the Activity Verifier and verify the action. Only when all approvals are made for every phase in the warehouse order fulfillment workflow is the cycle considered complete.

![image](https://github.com/user-attachments/assets/335e473f-116a-4446-87bc-77780a72c6da)

Finally, once the order is fulfilled, a lifecycle report is generated and stored on the Hedera File Service (HFS). The lifecycle report is a JSON file that acts as a comprehensive receipt, recording every event from start to finish, along with general order information.

![image](https://github.com/user-attachments/assets/c19af088-ac69-43b5-be77-e10e5cf6b65c)

Our eCommerce store sells three products, which serve as the inventory items for this setup. Our team manages the inventory by tokenizing each product into collections with Hedera Token Service (HTS). This is a valuable implementation for industries that want to tokenize their inventory, such as stocks, products, or raw materials, providing a digital twin representation on Hedera. We manage stock levels using a hybrid on-off-chain approach, which allows clients to hold products in their cart, and once the order is completed, the off-chain stock level is updated on-chain.

![image](https://github.com/user-attachments/assets/eb90f246-5556-4019-8e56-1426ddf18750)

Every supply chain has last mile logistic for the last stage, forming a complete close loop cycle. Hence, to enhance the transparency of this process and carried out with the help of Hedera technology, we created a consensus based attestation mechanism with Hedera Consensus Service (an innovative approach which is different from common EAS based attestation), named ADDA, Attestation Driven Distribution Assurance. It consist of two stages: pre-attestation and attestation. First, we perform a pre-attestation check with World ID, which is a smart way to ensure the logistic do deliver, and also the recipient is the real recipient. Then, both of them will upload their proof of delivery to Hedera File Service. The photo evidence, lifecycle report, together with the opposite party identity info will form the message schema and broadcast to their respective private topic for consensus. 

## 📸 Some screenshots of our demo DApp mentioned above


## 🔌Connecting local robotic fleet

![image](https://github.com/user-attachments/assets/726bcf2d-a4ad-4722-be6f-89860826edfa)

To further validate the feasibility of our implementation, we also perform testing on a physical robot, which we refer to as a local robotic fleet. The system is centered around the Hub as well, enabling industries to interact with an IoT connectivity layer (refer to above architecture overview). This layer acts as an intermediary between the robotic fleet and the Hub, which is integrated with the Hedera blockchain layer. The IoT connectivity layer can incorporate various technologies such as AWS IoT Core, Microsoft Azure IoT, Oracle IoT cloud, and MQTT-based solutions like RabbitMQ or Kafka, etc. 

To simplify the demonstration, our team utilized ngrok to establish a secure communication tunnel between our physical robot—a combination of a ROS-powered CoBot and a mobile AGV (Automated Guided Vehicle), with operations built using the Elephant Robotics Python API—and initiated the order fulfillment process on our DApp. As shown in the demo video, the commands assigned from the Hedera blockchain are successfully captured and transmitted to the connectivity layer, where they are received and executed by the robot in real time. Once the task is completed, the operation is logged and sent back via the same route. This process mirrors what can be tested directly on our demo DApp.

We also replicated this functionality using our Webots simulation (hosted locally in Webots software) to control the robotic fleet. By creating an intermediate connectivity layer (via a Flask server) and utilizing the ngrok tunnel, we successfully recreated the same results as with the physical robot. You can see the full demonstration in the video!

