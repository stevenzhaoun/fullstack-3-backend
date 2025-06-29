import { Router } from "express";
import { listOrders, createOrder, getOrder, deleteOrder, updateOrder } from "../controller/orders";
import { authorization } from "../middlewares/authorization";
import { PERMISSIONS } from "../constants";

const router = Router();

router.get('/orders', authorization([PERMISSIONS.ORDERS.READ]), listOrders);
router.get('/orders/:id', authorization([PERMISSIONS.ORDERS.READ]), getOrder);
router.post('/orders', authorization([PERMISSIONS.ORDERS.EDIT]), createOrder);
router.delete('/orders/:id', authorization([PERMISSIONS.ORDERS.EDIT]), deleteOrder);
router.put('/orders/:id', authorization([PERMISSIONS.ORDERS.EDIT]), updateOrder);

export default router; 