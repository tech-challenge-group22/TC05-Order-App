import IQueueService from '../../../../../application/ports/IQueueService';
import { OrderGatewayInterface } from '../../interfaces/gateways/OrderGatewayInterface';
import {
  UpdateOrderStatusDTO,
  UpdateOrderStatusParams,
} from './UpdateOrderStatusDTO';

export class UpdateOrderStatusUseCase {
  static async execute(
    params: UpdateOrderStatusParams,
    orderGateway: OrderGatewayInterface,
    queueService: IQueueService,
  ): Promise<UpdateOrderStatusDTO> {
    try {
      orderGateway.beginTransaction();

      let payment_status = 'Pendente';

      if (params.status === 3) {
        payment_status = 'Aprovado';
        const message = {
          order_id: params.order_id,
        };
        queueService.sendMessage({
          message,
          QueueOutputUrl: `${process.env.AWS_OUTPUT_ORDER_QUEUE_RECEIVED_URL}`,
          MessageGroupId: `${process.env.AWS_MESSAGE_GROUP}`,
        });
      }

      if (params.status === 2) {
        payment_status = 'Reprovado';
      }

      await orderGateway.updateOrderStatus(params.order_id, params.status);

      const orderInfo = await orderGateway.getOrders(params.order_id);
      const customer_id = orderInfo[0].customer_id;

      orderGateway.commit();

      const messagePaymentStatus = {
        order_id: params.order_id,
        customer_id,
        payment_status,
      };

      queueService.sendMessage({
        message: messagePaymentStatus,
        QueueOutputUrl: `${process.env.AWS_OUTPUT_PAYMENT_STATUS_NOTIFICATION_URL}`,
        MessageGroupId: `${process.env.AWS_MESSAGE_GROUP}`,
      });

      const result: UpdateOrderStatusDTO = {
        hasError: false,
        orderId: params.order_id,
        httpCode: 201,
        message: 'Status atualizado com sucesso',
      };
      return result;
    } catch (error) {
      const output: UpdateOrderStatusDTO = {
        orderId: 0,
        hasError: true,
        message: 'Error by inserting update order.',
        httpCode: 500,
      };

      return output;
    }
  }
}
