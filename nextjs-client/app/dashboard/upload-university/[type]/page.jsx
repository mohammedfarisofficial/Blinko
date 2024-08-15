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
import {
  createCourse,
  createUniversity,
} from "@/app/store/async-actions/dataAction";

const initialState = {
  university: "",
  course: "",
};

const UploadUniveritiesData = () => {
  const { type: pageType } = useParams();
  const [univeristyData, setUniveristyData] = useState(initialState);
  const { universities, courses, streams, semesters, subjects } = useSelector(
    (state) => state.data.universities
  );

  const dispatch = useDispatch();

  if (!pageType) {
    redirect("/dashboard/upload-university");
  }

  const createUniversityHandler = async () => {
    try {
      const uploadData = {
        title: univeristyData.university,
      };
      await dispatch(createUniversity({ uploadData, pageType }));
      setUniveristyData(initialState);
    } catch (err) {
      toast({
        title: err,
      });
    }
  };
  const createCourseHandler = async () => {
    console.log("trigger", univeristyData.university, univeristyData.course);
    const { university, course } = univeristyData;
    if (!university && !course) {
      return;
    }
    const uploadData = {
      university_id: university,
      title: course,
    };
    try {
      await dispatch(createCourse({ uploadData, pageType }));
      setUniveristyData(initialState);
    } catch (err) {
      toast({
        title: err,
      });
    }
  };

  const createHandler = () => {
    switch (pageType) {
      case "university": {
        createUniversityHandler();
        break;
      }
      case "course": {
        createCourseHandler();
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
  const onSelectHanlder = (value, type) => {
    setUniveristyData((prevState) => ({
      ...prevState,
      [type]: value,
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
        {pageType === COURSE && (
          <>
            <Label>Create Course</Label>
            <Select
              onValueChange={(value) => onSelectHanlder(value, UNIVERSITY)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Univeristy" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Univeristy</SelectLabel>
                  {universities.map((_university, index) => (
                    <SelectItem key={index} value={_university?._id}>
                      {_university.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label htmlFor="course">Course name</Label>
            <Input
              name="course"
              value={univeristyData.course}
              onChange={({ target }) => onChangeHandler(target)}
              placeholder="Type course name..."
              type="text"
            />
          </>
        )}
        {pageType === STREAM && <h2>stream render</h2>}
        {pageType === SEMESTER && <h2>semester render</h2>}
        {pageType === SUBJECT && <h2>subject render</h2>}
        <Button onClick={createHandler}>Create</Button>
      </Card>
    </div>
  );
};

export default UploadUniveritiesData;
