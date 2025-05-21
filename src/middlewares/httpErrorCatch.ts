export const wrap = (fn: any) => (req: any, res: any) => {
  fn(req, res).catch((e: Error) => {
    res.status(404).json({ error: e.message });
  });
};
