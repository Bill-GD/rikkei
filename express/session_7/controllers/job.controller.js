import JobService from '../services/job.service.js';

export default class JobController {
  static async getAll(req, res) {
    console.log('Hello world');
    try {
      let result = await JobService.getAll();
      console.log('result', result);
      res.json({
        result, message: 'GET ALL SUCCESSFULLY',
      });
    } catch (error) {
      res.json({
        message: 'Error occured on server', error,
      });
    }
  }

  static getOne(req, res) {
    res.json({
      message: 'GET ONE SUCCESSFULLY',
    });
  }

  static createOne(req, res) {
    res.json({
      message: 'POST ONE SUCCESSFULLY',
    });
  }

  static updateOne(req, res) {
    res.json({
      message: 'UPDATE ONE SUCCESSFULLY',
    });
  }

  static deleteOne(req, res) {
    res.json({
      message: 'DELETE ONE SUCCESSFULLY',
    });
  }
}
