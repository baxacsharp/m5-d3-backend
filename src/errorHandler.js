export const notFoundDebugging = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err.message);
  } else {
    next(err);
  }
};
export const smthWentWrong = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send(err.errorList);
  } else {
    next(err);
  }
};
export const forbiddenErrorHaandling = (err, req, res, next) => {
  if (err.status === 403) {
    res.status(403).send(err.message);
  } else {
    next(err);
  }
};
export const serverSideError = (err, req, res, next) => {
  res.status(500).send("Ops Something went wrong. Please try again later");
};
