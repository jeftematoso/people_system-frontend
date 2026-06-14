import {
  generateExecutiveReport
}
from "./executive-report.service";

export async function
summary(req, res) {

  const report =
    await generateExecutiveReport();

  return res.json(report);

}