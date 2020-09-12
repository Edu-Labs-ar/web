import express, { Application } from 'express';

// import { initDatabase, dbInitHook } from './sql';
import { apiRouter, formsRouter } from './routes';
// import { initUtils, registerTasks } from './utils';

class Server {
  public main: Application;
  public app: Application;

  constructor() {
    this.main = express();
    this.app = express();
    this.main.use('/api', this.app);

    this.config();
    this.routes();
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 3000);
    // this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // this.main.use(`/storage`, express.static(process.env.STORAGE));
  }

  public routes(): void {
    this.app.use('/', apiRouter);
    this.app.use('/forms', formsRouter);
  }

  public start(): void {
    this.main.listen(this.app.get('port'), () => console.log('Server on port', this.app.get('port')));
  }
}

// initDatabase();
// dbInitHook().subscribe(registerTasks);

new Server().start();
