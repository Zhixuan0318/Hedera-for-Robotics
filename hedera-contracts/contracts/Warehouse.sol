// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "./interfaces/Enums.sol";
import "./interfaces/IShop.sol";

error NotARobot();
error NotAnOwner();
error ELowValue();

contract Warehouse {
    enum Activity {
        Picking,
        Packing,
        Delivering
    }

    IShop Shop;

    address owner;

    mapping(address => bool) _robotApproval;
    mapping(uint64 => Activity) _requestToActivity;
    mapping(uint64 => string) _requestToOrder;

    event WarehouseActivity(string orderId, Enums.OrderStatus status);
    event AssingRobot(string orderId, Activity activity, uint256 robotId);
    event RequestRobotId(string orderId, uint256 requestId);
    event ActivityVerifier(
        string orderId,
        Activity activity,
        address indexed verifier
    );

    constructor(address shop) {
		owner = msg.sender;
		
        Shop = IShop(shop);
    }

    function setRobot(address robot) external onlyOwner {
        _robotApproval[robot] = true;
    }

    function processOrder(string memory orderId) external onlyOwner {
        Shop.updateOrderStatus(orderId, Enums.OrderStatus.Processing);

        emit WarehouseActivity(orderId, Enums.OrderStatus.Processing);
    }

    function pickOrder(
        string memory orderId,
        address verifier
    ) external onlyRobot {
        Shop.updateOrderStatus(orderId, Enums.OrderStatus.Picked);

        emit WarehouseActivity(orderId, Enums.OrderStatus.Picked);
        emit ActivityVerifier(orderId, Activity.Picking, verifier);
    }

    function packOrder(
        string memory orderId,
        address verifier
    ) external onlyRobot {
        Shop.updateOrderStatus(orderId, Enums.OrderStatus.Packed);

        emit WarehouseActivity(orderId, Enums.OrderStatus.Packed);
        emit ActivityVerifier(orderId, Activity.Packing, verifier);
    }

    function deliverOrder(
        string memory orderId,
        address verifier
    ) external onlyRobot {
        Shop.updateOrderStatus(orderId, Enums.OrderStatus.Delivered);

        emit WarehouseActivity(orderId, Enums.OrderStatus.Delivered);
        emit ActivityVerifier(orderId, Activity.Delivering, verifier);
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotAnOwner();
        _;
    }

    modifier onlyRobot() {
        if (!_robotApproval[msg.sender]) revert NotARobot();
        _;
    }
}