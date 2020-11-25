import { Parser } from 'json2csv';
const CsvGenerate = (data, res, filename, cells) => {
  const json2csv = new Parser({ cells });
  const csv = json2csv.parse(data)
  res.header('Content-Type', 'text/csv');
  res.attachment(filename);
  res.send(csv);
}
export default CsvGenerate
