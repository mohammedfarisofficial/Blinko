"use client";
import { useState } from "react";
import { redirect, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  COURSE,
  SEMESTER,
  STREAM,
  SUBJECT,
  UNIVERSITY,
} from "@/app/contants/universities";
import { createUniversity } from "@/app/store/async-actions/dataAction";

const initialState = {
  university: "",
};

const UploadUniveritiesData = () => {
  const { type: pageType } = useParams();
  const [univeristyData, setUniveristyData] = useState(initialState);
  // const { universities, courses, streams, semesters, subjects } = useSelector(
  //   (state) => state.data.universities
  // );

  const dispatch = useDispatch();

  if (!pageType) {
    redirect("/dashboard/upload-university");
  }

  const universityUploadhandler = async () => {
    try {
      switch (pageType) {
        case "university": {
          const uploadData = {
            title: univeristyData.university,
          };
          await dispatch(createUniversity({ uploadData, pageType }));
          setUniveristyData(initialState);
          break;
        }
        case "course": {
          break;
        }
        default: {
          break;
        }
      }
    } catch (err) {
      toast({
        title: err,
      });
    }
  };

  const uploadHandler = () => {
    switch (pageType) {
      case "university": {
        universityUploadhandler();
        break;
      }
      case "course": {
        universityUploadhandler();
        break;
      }
      default: {
        break;
      }
    }
  };

  const onChangeHandler = (target) => {
    const { name, value } = target;
    setUniveristyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-[100vh] flex items-center flex-col pt-5">
      <Card className="flex gap-y-2 flex-col p-5">
        {pageType === UNIVERSITY && (
          <>
            <Label htmlFor="university">Create University</Label>
            <Input
              name="university"
              value={univeristyData.university}
              onChange={({ target }) => onChangeHandler(target)}
              placeholder="Type unviersity..."
              type="text"
            />
          </>
        )}
        {pageType === COURSE && <h2>course render</h2>}
        {pageType === STREAM && <h2>stream render</h2>}
        {pageType === SEMESTER && <h2>semester render</h2>}
        {pageType === SUBJECT && <h2>subject render</h2>}
        <Button onClick={uploadHandler}>Upload</Button>
      </Card>
    </div>
  );
};

export default UploadUniveritiesData;
