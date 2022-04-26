import {
  Request, Response, NextFunction,
} from 'express';

import { logger } from '../infrastructure';

interface UserService {
  create(info: any): Promise<any>
}

export default class UserHandler {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public create(req: Request, res: Response, next: NextFunction): any {
    const { body } = req;

    return this.userService.create(body)
      .then(res.json)
      .catch((error) => {
        logger.error(error);

        return next(error);
      });
  }
}
