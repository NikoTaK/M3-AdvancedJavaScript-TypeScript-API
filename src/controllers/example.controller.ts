import { Request, Response } from 'express';

export const getExample = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'This is an example endpoint',
    data: {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    }
  });
};

export const createExample = (req: Request, res: Response) => {
  const { name, value } = req.body;
  
  if (!name || !value) {
    return res.status(400).json({
      error: 'Name and value are required'
    });
  }

  res.status(201).json({
    message: 'Example created successfully',
    data: {
      id: Date.now(),
      name,
      value,
      createdAt: new Date().toISOString()
    }
  });
};
