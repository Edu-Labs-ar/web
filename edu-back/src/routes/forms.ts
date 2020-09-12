import { Router } from 'express';
import { formsController } from '../controllers';
// import { queryLocation } from '../utils/pipes';

class FormsRoute {
  public router: Router = Router();

  constructor() {
    this.router.post('/save/:formId', formsController.save);
    this.router.get('/list/:formId', formsController.list);
  }
}
export const formsRouter = new FormsRoute().router;
