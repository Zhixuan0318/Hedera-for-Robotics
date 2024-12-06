<div align="center">
    <img src="https://github.com/user-attachments/assets/02159f3d-fffa-4320-ab36-ae46f65f2518" width=200>
    <h1>Hedera for Robotics</h1>
    <strong>Connecting Industrial Robotic Automation to Hedera</strong>  
</div>

<br>

![Frame 64 (3)](https://github.com/user-attachments/assets/e769a84d-5d70-47f5-ad36-26d9ffe50a78)


## Problem Statement

![Slide5](https://github.com/user-attachments/assets/ce9a77ac-145f-4aa8-9e67-4141d2f68301)

Data centralization is one of the key issue when industries are operating their robotic automation in a web2-based infrastructure setup. Industries often adopt distributed manufacturing strategy which form a complex supply chain and involve various stakeholders and manufacturing units spreading in different locations. Hence, in a web2-based robotic infrastructure, each parties are actually siloed, as the data systems are disjoint, causing information asymmetry. In other words, A robot system in one factory may collect data that are not shared with robots in another factory, making it difficult to get a unified view of operations. The problems which arises will be:

#### ❌ Data is not Transparent: 

Factories and warehouses operating their robotic fleets in an isolated data systems or across various locations, will create a "visibility gap" that limits transparency and access to real-time operational data for stakeholders.
   
#### ❌ Low Efficiency + Track and Trace Challenge: 

Workflow efficiency suffers due to the complex data integration processes that slow decision-making and create operational bottlenecks. This lack of transparency also complicates essential tasks like tracking the history of production or the origin of raw materials, even among connected facilities. The underlying reason is the lack of clear auditing trials which can be easily access, and this is a classic problem in supply chain sector.
   
#### ❌ Security Concerns: 

Security concerns are heightened in Web2 environments, where mutable data is vulnerable to tampering and counterfeiting, which is considered a damage to the supply chain trust. Additionally, the risk of a single point of failure can lead to significant disruptions, cascading through the entire robotic automation operation.

## Inspirations

To address the problems, letting current industries robotic setup to transition and utilise a Hedera-connected distributed data system is a smart move. The intuition behind is simple: Every action taken by a robot in a factory is recorded on the blockchain, making product movement, quality checks, and production steps fully transparent, traceable, verifiable, and tamper-resistant, significantly enhancing security and auditability for all supply chain stakeholders. Our team had included this in our demo video, don't miss it!

#### ⭐ Key Benefits: 

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

☹️ Although industries can create their own tools or middleware for Web3 integration, this approach can be costly, time-consuming, and resource-intensive. We need a solution to bridge the gap between industry robotic automation (web2 layer) and the Hedera ecosystem (web3 layer).

Here is a concept illustration:

![Slide9](https://github.com/user-attachments/assets/3ed284bc-6eb1-4a5f-8656-11ba4d961875)


## 💪 We launch Hedera for Robotics, focusing on robots (Our Solution)

Hence, our team decided to launch Hedera for Robotics as the first B2B Middleware-as-a-Service (MaaS) provider, assisting industries across various sectors with industrial robotic automation by designing and developing a custom API hub. This hub acts like a bridge, which connects all components in their robotic automation setup architecture to the Hedera ecosystem. The benefit of using a custom middleware hub is that all of the important layers in the Web2-based robotic automation systems such as the factory floor (physical hardwares and robotics), IoT connectivity layer, security layer and also control and management layer, able to interact with the blockchain layer component easily (which involve on-chain assets, Hedera services, accounts, smart contract or any on-chain tooling integration). Our hub will now become the common interface for industries to connect all robotic components built by different language, framework, hardware, and communication protocol into a unified Web3 system on Hedera. Below is a high-level architecture overview of a custom hub in a industry robotic setup:

### Introduce the concept of Hub - Architecture Overview

![Slide11](https://github.com/user-attachments/assets/58a0cd93-d89f-42ed-bbcd-1b7d1bfba962)

