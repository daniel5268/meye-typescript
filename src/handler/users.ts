import {
  Request, Response, NextFunction,
} from 'express';

import User from '../domain/entities/User';
import { logger } from '../infrastructure';

interface UserService {
  create(info: Partial<User>): Promise<Partial<User>>
}

export default class UserHandler {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public create(req: Request, res: Response, next: NextFunction): any {
    const { body } = req;

    return this.userService.create(body as Partial<User>)
      .then(res.json)
      .catch((error) => {
        logger.error(error);

        return next(error);
      });
  }
}
