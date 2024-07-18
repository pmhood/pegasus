// import * as express from 'express';
// import { TodoController } from '../controllers/todo-controller';

// export class TodoRoutes {
//   public static addRoutes(app: express.Application) {
//     const todoController = new TodoController();

//     app.post('/api/todo/tasks/:taskId/completed', async (req, res) => {
//       try {
//         const taskId = req.params.taskId;
//         if (taskId) {
//           const result = await todoController.closeTask(taskId);
//           if (result) {
//             res.sendStatus(204);
//           } else {
//             res.sendStatus(500);
//           }
//         } else {
//           res.status(400).send({ message: 'No taskId in body' });
//         }
//       } catch (e) {
//         console.error(e.message);
//         res.status(500).send({
//           message: e.message
//         });
//       }
//     });
//   }
// }
