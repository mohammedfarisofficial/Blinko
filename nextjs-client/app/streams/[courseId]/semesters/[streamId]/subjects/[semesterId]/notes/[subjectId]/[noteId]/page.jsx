"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import * as pdfjsLib from "pdfjs-dist";
// import "pdfjs-dist/web/pdf_viewer.css";

import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/header/header";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const firebasePDFUrl =
  "https://firebasestorage.googleapis.com/v0/b/blinko-4f62f.appspot.com/o/notes%2FCST203%20LOGIC%20SYSTEM%20DESIGN%2C%20DECEMBER%202020.pdf?alt=media&token=5171f5c5-108d-4d76-8dc1-3f38a17e02ff"; // Your Firebase PDF URL

const Note = () => {
  const { noteId } = useParams();
  const { notes, subjects } = useSelector((state) => state.data.universities);

  const getBySlug = notes.filter((note) => note?.slug === noteId)[0];
  const getSubjectBySlug = subjects.filter(
    (subject) => subject?._id === getBySlug?.subject_id
  )[0];

  console.log(getBySlug);
  return (
    <div className="w-full h-[100vh] flex items-center flex-col">
      <Header>
        <div>
          <h1>{getBySlug.name}</h1>
          <p className="text-gray-400 text-sm">{getSubjectBySlug.title}</p>
          <p className="text-gray-400 text-sm">Click Download</p>
        </div>
        <Link href={getBySlug?.downloadURL}>
          <Button>Download</Button>
        </Link>
      </Header>

      {/* <p>{JSON.stringify(getBySlug)}</p> */}
      <Viewer theme="black" fileUrl={getBySlug?.downloadURL} />
    </div>
  );
};

export default Note;
