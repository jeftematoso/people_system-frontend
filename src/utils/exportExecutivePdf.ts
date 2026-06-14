import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function exportExecutivePdf() {

  const dashboard =
    document.getElementById(
      "executive-dashboard"
    );

  if (!dashboard) return;

  const canvas =
    await html2canvas(
      dashboard,
      {
        scale: 2,
      }
    );

  const imgData =
    canvas.toDataURL(
      "image/png"
    );

  const pdf =
    new jsPDF(
      "p",
      "mm",
      "a4"
    );

  const pdfWidth =
    pdf.internal.pageSize.getWidth();

  const pdfHeight =
    (canvas.height * pdfWidth)
    / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pdfWidth,
    pdfHeight
  );

  pdf.save(
    `Executive_Report_${
      new Date()
        .toISOString()
        .split("T")[0]
    }.pdf`
  );

}