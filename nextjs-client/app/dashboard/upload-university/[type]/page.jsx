"use client";
import { redirect, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COURSE,
  SEMESTER,
  STREAM,
  SUBJECT,
  UNIVERSITY,
} from "@/app/contants/universities";

const UploadUniveritiesData = () => {
  const { type } = useParams();

  if (!type) {
    redirect("/dashboard/upload-university");
  }

  return (
    <div className="w-full h-[100vh] flex items-center flex-col pt-5">
      <Card className="flex gap-y-2 flex-col p-5">
        {type === UNIVERSITY && (
          <>
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select University" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select University</SelectLabel>
                  <SelectItem>hi</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select University" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select University</SelectLabel>
                  <SelectItem>hi</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select University" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select University</SelectLabel>
                  <SelectItem>hi</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        )}
        {type === COURSE && <h2>course render</h2>}
        {type === STREAM && <h2>stream render</h2>}
        {type === SEMESTER && <h2>semester render</h2>}
        {type === SUBJECT && <h2>subject render</h2>}
      </Card>
    </div>
  );
};

export default UploadUniveritiesData;
