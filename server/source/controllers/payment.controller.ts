import { Request, Response, NextFunction } from 'express';
import OrderModel from '../models/order.model';

import mercadopago from 'mercadopago';
import { createPreference } from '../utils/payment/mercadopago.util';
mercadopago.configurations.setAccessToken('TEST-8996179535531122-050412-52fc66edac0f898f91560cf495c70482-672604099');

export async function processPayment(request: Request, response: Response, next: NextFunction) {
  const { orderId, paymentData } = request.body;

  try {
    const order = await OrderModel.findById(orderId);

    if (order && ['pending', 'rejected'].includes(order.status)) {
      // Send payment to api
      const mdoPagoRes = await mercadopago.payment.save(paymentData.formData);
      const { status, status_detail, id } = mdoPagoRes.body;
      // Update order with api response
      order.status = status;
      await order.save();

      response.status(201).json({ status, status_detail, id });
    } else {
      response.status(400).json({ message: `Order with id ${orderId} not exist.` });
    }
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
}

export async function getPreferenceId(request: Request, response: Response, next: NextFunction) {
  const { items } = request.body;
  try {
    const preferenceId = createPreference(items);

    response.status(201).json({ preferenceId });
  } catch (error) {
    next(error);
  }
}
