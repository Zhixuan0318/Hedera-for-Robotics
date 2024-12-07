// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "./interfaces/IWarehouse.sol";

error NotAnOwner();

contract PickingRobot {

	IWarehouse Warehouse;
	address _owner;

	constructor(address warehouse) {
		Warehouse = IWarehouse(warehouse);
		_owner = msg.sender;
	}

	function pickOrder(string memory orderId, address verifier) external {
		if(msg.sender != _owner) revert NotAnOwner();
		Warehouse.pickOrder(orderId, verifier);
	}
}

contract PackingRobot {
	
	IWarehouse Warehouse;
	address _owner;

	constructor(address warehouse) {
		Warehouse = IWarehouse(warehouse);
		_owner = msg.sender;
	}

	function packOrder(string memory orderId, address verifier) external {
		if(msg.sender != _owner) revert NotAnOwner();
		Warehouse.packOrder(orderId, verifier);
	}
}

contract DeliveryRobot {
	
	IWarehouse Warehouse;
	address _owner;

	constructor(address warehouse) {
		Warehouse = IWarehouse(warehouse);
		_owner = msg.sender;
	}

	function deliverOrder(string memory orderId, address verifier) external {
		if(msg.sender != _owner) revert NotAnOwner();
		Warehouse.deliverOrder(orderId, verifier);
	}
}