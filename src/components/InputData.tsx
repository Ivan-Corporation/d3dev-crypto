import { SetStateAction } from "react";
import Papa from "papaparse";
import { papaConfig } from "../config/papaConfig";
function isJSON(str: any) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}
function InputData({ cryptoData, setCryptoData }: any) {
  const handleMessageChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const csvString: any = event.target.value;

    if (isJSON(csvString) === true) {
      setCryptoData(JSON.parse(csvString));
    } else if (isJSON(csvString) === false) {
      let parsedCsv = Papa.parse(csvString, papaConfig);
      setCryptoData(parsedCsv);
    }
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Write your data
      </label>
      <textarea
        onChange={handleMessageChange}
        id="csvString"
        rows={12}
        value={JSON.stringify(cryptoData)}
        className="block p-2.5 w-full text-sm  rounded-lg border  focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
        placeholder="Paste your crypto data here..."
      ></textarea>
    </div>
  );
}

export default InputData;
