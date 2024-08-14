"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  COURSE,
  SEMESTER,
  STREAM,
  SUBJECT,
  UNIVERSITY,
} from "@/app/contants/universities";

const UploadUniversity = () => {
  const router = useRouter();

  const navigationHandler = (type) => {
    router.push(`/dashboard/upload-university/${type}`);
  };
  return (
    <div className="w-full h-[100vh] flex items-center flex-col pt-5">
      <div className="w-full">
        <Card className="mt-2 flex justify-between items-center px-10 py-2">
          <h2>Universities</h2>
          <Button onClick={() => navigationHandler(UNIVERSITY)}>Create</Button>
        </Card>
        <Card className="mt-2 flex justify-between items-center px-10 py-2">
          <h2>Courses</h2>
          <Button onClick={() => navigationHandler(COURSE)}>Create</Button>
        </Card>
        <Card className="mt-2 flex justify-between items-center px-10 py-2">
          <h2>Streams</h2>
          <Button onClick={() => navigationHandler(STREAM)}>Create</Button>
        </Card>
        <Card className="mt-2 flex justify-between items-center px-10 py-2">
          <h2>Semesters</h2>
          <Button onClick={() => navigationHandler(SEMESTER)}>Create</Button>
        </Card>
        <Card className="mt-2 flex justify-between items-center px-10 py-2">
          <h2>Subjects</h2>
          <Button onClick={() => navigationHandler(SUBJECT)}>Create</Button>
        </Card>
      </div>
    </div>
  );
};

export default UploadUniversity;
