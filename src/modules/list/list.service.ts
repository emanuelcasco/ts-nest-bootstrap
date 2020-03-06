import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListEntity } from './list.entity';

import { CrudService } from '../shared/services';

@Injectable()
export class ListService extends CrudService<ListEntity> {
  constructor(
    @InjectRepository(ListEntity)
    private readonly listRepository: Repository<ListEntity>
  ) {
    super(listRepository);
  }
}
