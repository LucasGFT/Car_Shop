import { Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcyclesController {
  private req: Request;
  private res: Response;
  private service: MotorcycleService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    // this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const { model, year, color, status, buyValue, category, engineCapacity } = this.req.body;
    const Motorcycles: IMotorcycle = {
      model,
      year,
      color,
      status,
      buyValue,
      category,
      engineCapacity,
    };

    const newMotorcycles = await this.service.createMotorcycle(Motorcycles);
    return this.res.status(201).json(newMotorcycles);
  }

  public async getMotorcycles() {
    const motorcycles = await this.service.getMotorcycles();
    return this.res.status(200).json(motorcycles);
  }

  public async getMotorcycle() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getMotorcycle(id);
      if (car === null) return this.res.status(422).json({ message: 'Invalid mongo id' });
      return this.res.status(200).json(car);
    } catch (error) {
      return this.res.status(404).json({ message: 'Motorcycle not found' });
    }
  }
}

export default MotorcyclesController;
