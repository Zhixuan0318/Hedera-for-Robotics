import Contracts from '@/class/HederaContracts';
import Firebase from '@/services/Database';

export async function processStage(orderId: string, stage: number, address: string) {
    const firebase = new Firebase();

    if (stage == 1) {
        const hash = await Contracts.processOrder(orderId);
        const [rHash, robotId] = await Contracts.generateRandomRobotId();

        const order = await firebase.getOrder(address, orderId);
        order.hashes[1] = hash;
        order.hashes.push('empty');
        await firebase.updateOrder(address, order);
        await new Promise((resolve) => setTimeout(resolve, 3_000));

        order.hashes[2] = rHash;
        order.hashes.push('empty');
        order.robots[0] = robotId;
        await firebase.updateOrder(address, order);
    }

    if (stage == 2) {
        const hash = await Contracts.pickOrder(orderId);
        const [rHash, robotId] = await Contracts.generateRandomRobotId();

        const order = await firebase.getOrder(address, orderId);
        order.hashes[3] = hash;
        order.hashes.push('empty');
        await firebase.updateOrder(address, order);
        await new Promise((resolve) => setTimeout(resolve, 3_000));

        order.hashes[4] = rHash;
        order.hashes.push('empty');
        order.robots[1] = robotId;
        await firebase.updateOrder(address, order);
    }

    if (stage == 3) {
        const hash = await Contracts.packOrder(orderId);
        const [rHash, robotId] = await Contracts.generateRandomRobotId();

        const order = await firebase.getOrder(address, orderId);
        order.hashes[5] = hash;
        order.hashes.push('empty');
        await firebase.updateOrder(address, order);
        await new Promise((resolve) => setTimeout(resolve, 3_000));

        order.hashes[6] = rHash;
        order.hashes.push('empty');
        order.robots[2] = robotId;
        await firebase.updateOrder(address, order);
    }

    if (stage == 4) {
        const hash = await Contracts.deliverOrder(orderId);
        const order = await firebase.getOrder(address, orderId);
        order.hashes[7] = hash;
        await firebase.updateOrder(address, order);
    }
}
