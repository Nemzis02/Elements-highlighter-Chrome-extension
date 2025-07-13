import { Request, Response, NextFunction } from 'express';
import { fetchHTMLElements } from './fetchers';

export const parseWebPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { html } = req.body;

    if (typeof html !== 'string') {
      res
        .status(400)
        .json({ error: 'FAILED_VALIDATION', message: 'HTML is not a string' });

      return;
    }

    const result = await fetchHTMLElements(html);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
