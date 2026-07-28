import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';

export abstract class FilmsRepository {
  abstract findAll(): Promise<Film[]>;
  abstract findSchedule(filmId: string): Promise<Schedule[] | null>;
  abstract findSession(
    filmId: string,
    sessionId: string,
  ): Promise<Schedule | null>;
  abstract reserveSeats(
    filmId: string,
    sessionId: string,
    places: string[],
  ): Promise<boolean>;
}

@Injectable()
export class AppRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findSchedule(filmId: string): Promise<Schedule[] | null> {
    const filmExists = await this.filmRepository.existsBy({ id: filmId });

    if (!filmExists) {
      return null;
    }

    return this.scheduleRepository.find({
      where: { filmId },
      select: {
        id: true,
        daytime: true,
        hall: true,
        rows: true,
        seats: true,
        price: true,
        taken: true,
      },
      order: { daytime: 'ASC', hall: 'ASC' },
    });
  }

  findSession(filmId: string, sessionId: string): Promise<Schedule | null> {
    return this.scheduleRepository.findOneBy({
      id: sessionId,
      filmId,
    });
  }

  reserveSeats(
    filmId: string,
    sessionId: string,
    places: string[],
  ): Promise<boolean> {
    return this.dataSource.transaction(async (entityManager) => {
      const repository = entityManager.getRepository(Schedule);
      const schedule = await repository
        .createQueryBuilder('schedule')
        .setLock('pessimistic_write')
        .where('schedule.id = :sessionId', { sessionId })
        .andWhere('schedule.filmId = :filmId', { filmId })
        .getOne();

      if (!schedule || places.some((place) => schedule.taken.includes(place))) {
        return false;
      }

      schedule.taken = [...new Set([...schedule.taken, ...places])];
      await repository.save(schedule);

      return true;
    });
  }
}
