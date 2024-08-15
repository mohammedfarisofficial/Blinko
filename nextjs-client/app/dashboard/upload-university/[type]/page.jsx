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
  createSemester,
  createStream,
  createSubject,
  createUniversity,
} from "@/app/store/async-actions/dataAction";

const initialState = {
  university: "",
  course: "",
  stream: "",
  semester: "",
  subject: "",
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
  const createSemesterHandler = async () => {
    console.log(
      "trigger",
      univeristyData.university,
      univeristyData.course,
      univeristyData.stream,
      univeristyData.semester
    );
    const { university, course, stream, semester } = univeristyData;
    if (!university && !course & !stream & !semester) {
      return;
    }
    const uploadData = {
      university_id: university,
      course_id: course,
      stream_id: stream,
      title: semester,
    };
    try {
      await dispatch(createSemester({ uploadData, pageType }));
      setUniveristyData(initialState);
    } catch (err) {
      toast({
        title: err,
      });
    }
  };
  const createStreamHandler = async () => {
    console.log(
      "trigger",
      univeristyData.university,
      univeristyData.course,
      univeristyData.stream
    );
    const { university, course, stream } = univeristyData;
    if (!university && !course & !stream) {
      return;
    }
    const uploadData = {
      university_id: university,
      course_id: course,
      title: stream,
    };
    try {
      await dispatch(createStream({ uploadData, pageType }));
      setUniveristyData(initialState);
    } catch (err) {
      toast({
        title: err,
      });
    }
  };
  const createSubjectHandler = async () => {
    console.log("trigger", univeristyData);
    const { university, course, stream, semester, subject } = univeristyData;
    if (!university && !course & !stream & !semester & !subject) {
      return;
    }
    const uploadData = {
      university_id: university,
      course_id: course,
      stream_id: stream,
      semester_id: semester,
      title: subject,
    };
    try {
      await dispatch(createSubject({ uploadData, pageType }));
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
      case "stream": {
        createStreamHandler();
        break;
      }
      case "semester": {
        createSemesterHandler();
        break;
      }
      case "subject": {
        createSubjectHandler();
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
  const coursesUnderUniversity = courses.filter(
    (course) => course?.university_id === univeristyData?.university
  );
  const streamsUnderCourses = streams.filter(
    (stream) => stream?.course_id === univeristyData?.course
  );
  const semesterUnderStreams = semesters.filter(
    (semester) => semester?.stream_id === univeristyData?.stream
  );
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
        {pageType === STREAM && (
          <>
            <Label>Create Stream</Label>
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
            <Label>Select Course</Label>
            <Select onValueChange={(value) => onSelectHanlder(value, COURSE)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Course</SelectLabel>
                  {coursesUnderUniversity.map((_course, index) => (
                    <SelectItem key={index} value={_course?._id}>
                      {_course?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label htmlFor="stream">Stream name</Label>
            <Input
              name="stream"
              value={univeristyData.stream}
              onChange={({ target }) => onChangeHandler(target)}
              placeholder="Type stream name..."
              type="text"
            />
          </>
        )}
        {pageType === SEMESTER && (
          <>
            <Label>Select University</Label>
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
            <Label>Select Course</Label>
            <Select onValueChange={(value) => onSelectHanlder(value, COURSE)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Course</SelectLabel>
                  {coursesUnderUniversity.map((_course, index) => (
                    <SelectItem key={index} value={_course?._id}>
                      {_course?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label>Select Stream</Label>
            <Select onValueChange={(value) => onSelectHanlder(value, STREAM)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Stream</SelectLabel>
                  {streamsUnderCourses.map((_stream, index) => (
                    <SelectItem key={index} value={_stream?._id}>
                      {_stream?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label htmlFor="semester">Semester name</Label>
            <Input
              name="semester"
              value={univeristyData.semester}
              onChange={({ target }) => onChangeHandler(target)}
              placeholder="Type semester name..."
              type="text"
            />
          </>
        )}
        {pageType === SUBJECT && (
          <>
            <Label>Select University</Label>
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
            <Label>Select Course</Label>
            <Select onValueChange={(value) => onSelectHanlder(value, COURSE)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Course</SelectLabel>
                  {coursesUnderUniversity.map((_course, index) => (
                    <SelectItem key={index} value={_course?._id}>
                      {_course?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label>Select Stream</Label>
            <Select onValueChange={(value) => onSelectHanlder(value, STREAM)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Stream</SelectLabel>
                  {streamsUnderCourses.map((_stream, index) => (
                    <SelectItem key={index} value={_stream?._id}>
                      {_stream?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label>Select Semester</Label>
            <Select onValueChange={(value) => onSelectHanlder(value, SEMESTER)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Semester</SelectLabel>
                  {semesterUnderStreams.map((_semester, index) => (
                    <SelectItem key={index} value={_semester?._id}>
                      {_semester?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label htmlFor="subject">Subject name</Label>
            <Input
              name="subject"
              value={univeristyData.subject}
              onChange={({ target }) => onChangeHandler(target)}
              placeholder="Type semester name..."
              type="text"
            />
          </>
        )}
        <Button onClick={createHandler}>Create</Button>
      </Card>
    </div>
  );
};

export default UploadUniveritiesData;
