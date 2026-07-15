import { Body, Controller, Post } from '@nestjs/common';

import { ListResponseDto } from '../films/dto/films.dto';
import { OrderedTicketDto, OrderPayload } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(
    @Body() payload: OrderPayload,
  ): Promise<ListResponseDto<OrderedTicketDto>> {
    return this.orderService.createOrder(payload);
  }
}
