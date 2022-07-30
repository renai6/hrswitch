import { Request, Response } from "express";
import { model } from "../../config/db";

export const createEmployee = async (req: Request, res: Response) => {
  const {
    businessUnitId,
    name,
    address,
    phone,
    SSSNumber,
    PhilHealthNumber,
    TaxIdNumber,
  } = req.body;

  try {
    const createdEmployee = await model.employee.create({
      data: {
        businessUnitId,
        name,
        address,
        phone,
        SSSNumber,
        PhilHealthNumber,
        TaxIdNumber,
      },
    });

    return res.status(201).json({
      id: createdEmployee.id,
      businessUnitId: createdEmployee.businessUnitId,
      name: createdEmployee.name,
      address: createdEmployee.address,
      phone: createdEmployee.phone,
      SSSNumber: createdEmployee.SSSNumber,
      PhilHealthNumber: createdEmployee.PhilHealthNumber,
      TaxIdNumber: createdEmployee.TaxIdNumber,
      createdAt: createdEmployee.createdAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error");
  }
};

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await model.employee.findMany();

    return res.status(200).json(employees);
  } catch (error) {}
};
