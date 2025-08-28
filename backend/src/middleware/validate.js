import { ZodError } from 'zod';

// validate({ body: zodSchema, query: zodSchema, params: zodSchema })
export function validate(schemas) {
  return (req, res, next) => {
    try {
      if (schemas?.body) {
        const parsed = schemas.body.parse(req.body);
        req.body = parsed;
      }
      if (schemas?.query) {
        const parsed = schemas.query.parse(req.query);
        req.query = parsed;
      }
      if (schemas?.params) {
        const parsed = schemas.params.parse(req.params);
        req.params = parsed;
      }
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const error = new Error('Validation error');
        error.status = 400;
        error.details = err.issues.map((i) => ({ path: i.path.join('.'), message: i.message, code: i.code }));
        return next(error);
      }
      return next(err);
    }
  };
}
