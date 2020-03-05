const orderService = require('../service/order.service');

const getOrders = async (req, res) => {
      try {
        const result = await orderService.getOrders({});
            return res.status(200).send(result);
          } catch (e) {
            console.log(e);
            return res.sendStatus(400);
          } 
}

const createOrder = async (req, res) => {
  const order = req.body;
  order["_id"] = undefined;
  try {
    const created = await orderService.create(order);
    return res.status(200).send(created);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  } 

}

const getOrderById = async (req,res) => {
  const id = req.params.id;
  try {
    const order = await orderService.getOrderById(id);
    return res.status(200).send(order);
  } catch (e) {
    return res.sendStatus(400);
  }
}

const updateOrder = async (req,res) => {
  const order = req.body;
  try { 
    const replaced = await orderService.update(order);
    if (!replaced || !replaced.ok || !replaced.n) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(400);
  }
} 

const checkOrder = async (req,res) => {
  const id = req.params.id;
  try {
    const order = await orderService.getOrderById(id);
    const status = order.status;
    return res.status(200).send(status);
  } catch (e) {
    return res.sendStatus(400);
  }
}


const deleteOrder =  async (req, res) => {
  const id = req.params.id;
  try { 
    const deleted = await orderService.deleteById(id);
    if (!deleted || !deleted.ok || !deleted.n) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
}


module.exports =  { createOrder, getOrders, getOrderById, updateOrder, checkOrder, deleteOrder };
