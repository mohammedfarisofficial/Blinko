"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import * as pdfjsLib from "pdfjs-dist";
// import "pdfjs-dist/web/pdf_viewer.css";

import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const firebasePDFUrl =
  "https://firebasestorage.googleapis.com/v0/b/blinko-4f62f.appspot.com/o/notes%2FCST203%20LOGIC%20SYSTEM%20DESIGN%2C%20DECEMBER%202020.pdf?alt=media&token=5171f5c5-108d-4d76-8dc1-3f38a17e02ff"; // Your Firebase PDF URL

const Note = () => {
  const { noteId } = useParams();
  const { notes } = useSelector((state) => state.data.universities);

  const getBySlug = notes.filter((note) => note?.slug === noteId)[0];

  const downloadNote = () => {
    download(firebasePDFUrl, function (err) {
      if (err) throw err;
      console.log("meow");
    });
  };
  return (
    <div className="w-full h-[100vh] flex items-center flex-col">
      <Link href={firebasePDFUrl}><Button>Download</Button></Link>
      <p>{noteId}</p>
      <p>{JSON.stringify(getBySlug)}</p>
      <Viewer theme="black" fileUrl={firebasePDFUrl} />
    </div>
  );
};

export default Note;
