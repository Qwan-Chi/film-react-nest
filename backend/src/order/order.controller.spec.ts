import { CreateOrderDto, OrderedTicketDto } from './dto/order.dto';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  const orderService = {
    createOrder: jest.fn(),
  };
  const controller = new OrderController(
    orderService as unknown as OrderService,
  );

  beforeEach(() => jest.clearAllMocks());

  it('passes an order to OrderService and returns booked tickets', async () => {
    const payload: CreateOrderDto = {
      email: 'user@example.com',
      phone: '+79999999999',
      tickets: [{ film: 'film-1', session: 'session-1', row: 1, seat: 2 }],
    };
    const response = {
      total: 1,
      items: [{ id: 'ticket-1' } as OrderedTicketDto],
    };
    orderService.createOrder.mockResolvedValue(response);

    await expect(controller.createOrder(payload)).resolves.toBe(response);
    expect(orderService.createOrder).toHaveBeenCalledWith(payload);
  });
});
