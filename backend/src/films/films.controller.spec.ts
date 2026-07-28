import { FilmDto, ListResponseDto, ScheduleDto } from './dto/films.dto';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  const filmsService = {
    getFilms: jest.fn(),
    getSchedule: jest.fn(),
  };
  const controller = new FilmsController(
    filmsService as unknown as FilmsService,
  );

  beforeEach(() => jest.clearAllMocks());

  it('returns films received from FilmsService', async () => {
    const response: ListResponseDto<FilmDto> = {
      total: 1,
      items: [{ id: 'film-1', title: 'Film' } as FilmDto],
    };
    filmsService.getFilms.mockResolvedValue(response);

    await expect(controller.getFilms()).resolves.toBe(response);
    expect(filmsService.getFilms).toHaveBeenCalledTimes(1);
  });

  it('requests the schedule for the selected film', async () => {
    const response: ListResponseDto<ScheduleDto> = {
      total: 1,
      items: [{ id: 'session-1' } as ScheduleDto],
    };
    filmsService.getSchedule.mockResolvedValue(response);

    await expect(controller.getSchedule('film-1')).resolves.toBe(response);
    expect(filmsService.getSchedule).toHaveBeenCalledWith('film-1');
  });
});
