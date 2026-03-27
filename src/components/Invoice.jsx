import React, { useRef } from "react";
import "./Invoice.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Invoice({ invoice, onClose }) {
  const invoiceRef = useRef();

  if (!invoice) return null;

  const quantity = invoice.quantity || 0;
  const price = invoice.price || 0;
  const total = quantity * price;

  // 🖨️ PRINT
  const handlePrint = () => {
    const printContent = invoiceRef.current.innerHTML;
    const newWindow = window.open("", "", "width=600,height=600");

    newWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial; padding: 20px; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);

    newWindow.document.close();
    newWindow.print();
  };

  // 📄 DOWNLOAD PDF (FIXED)
  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff", // 🔥 FIX
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`invoice_${invoice.id}.pdf`);
  };

  // 📤 SHARE
  const handleShare = async () => {
    const text = `
Invoice Details:
ID: ${invoice.id}
Name: ${invoice.name}
Quantity: ${quantity}
Price: ₹${price}
Total: ₹${total}
    `;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Invoice",
          text: text,
        });
      } catch (err) {
        alert("Sharing cancelled");
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Invoice copied to clipboard!");
    }
  };

  return (
    <div className="invoice-overlay">
      <div className="invoice-modal">

        {/* ✅ ONLY THIS PART IS CAPTURED */}
        <div ref={invoiceRef} className="invoice-content">
          <h2>🧾 Invoice Receipt</h2>

          <p><strong>ID:</strong> {invoice.id}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
          <p><strong>Name:</strong> {invoice.name}</p>

          <p><strong>Quantity:</strong> {quantity}</p>
          <p><strong>Price:</strong> ₹{price}</p>

          <h3>Total: ₹{total}</h3>
        </div>

        {/* 🔥 ACTION BUTTONS */}
        <div className="invoice-actions">
          <button onClick={handlePrint}>🖨️ Print</button>
          <button onClick={handleDownloadPDF}>📄 PDF</button>
          <button onClick={handleShare}>📤 Share</button>
          <button onClick={onClose}>❌ Close</button>
        </div>

      </div>
    </div>
  );
}

export default Invoice;