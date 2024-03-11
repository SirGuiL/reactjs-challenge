export class FileUtils {
  static downloadTable(name: string) {
    const csv = this.convertToCsv();

    if (!csv) {
      return;
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `${name}.csv`);
    link.click();
  }

  static convertToCsv() {
    const table = document.querySelector("table");

    if (!table) {
      return;
    }

    let csv = [];
    const rows = table.querySelectorAll("tr");

    for (const row of rows) {
      const cols = row.querySelectorAll("td, th");
      const rowData = [];

      for (const col of cols) {
        // @ts-ignore
        rowData.push(col.innerText);
      }
      csv.push(rowData.join(","));
    }

    return csv.join("\n");
  }
}
