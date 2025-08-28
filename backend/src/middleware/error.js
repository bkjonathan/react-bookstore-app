export function notFound(req, res, next) {
  res.status(404);
  res.json({ message: 'Not Found' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const payload = { message };
  if (err.details) payload.details = err.details;
  if (process.env.NODE_ENV === 'development' && err.stack) payload.stack = err.stack;
  res.status(status).json(payload);
}
