import { createSlice } from "@reduxjs/toolkit";
import {
  createCourse,
  createSemester,
  createStream,
  createSubject,
  createUniversity,
} from "../async-actions/dataAction";
import { toast } from "@/components/ui/use-toast";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    universities: null,
    isUniveristyCreating: false,
    isCourseCreating: false,
    isStreamCreating: false,
    isSemesterCreating: false,
    isSubjectCreating: false,
  },
  reducers: {
    setUniversities: (state, action) => {
      state.universities = action.payload;
    },
    setNote: (state, action) => {
      state.universities.notes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    //Create University
    builder.addCase(createUniversity.fulfilled, (state, action) => {
      toast({
        title: "New university created!",
        description: action.payload.title,
      });
      state.isUniveristyCreating = false;
      console.log("builder fullfil", action.payload);
    });
    builder.addCase(createUniversity.pending, (state, action) => {
      state.isUniveristyCreating = true;
    });
    builder.addCase(createUniversity.rejected, (state, action) => {
      toast({
        title: action.payload,
        variant: "destructive",
      });
      state.isUniveristyCreating = false;
      return state;
    });

    //Create Course
    builder.addCase(createCourse.fulfilled, (state, action) => {
      toast({
        title: "New course created!",
        description: action.payload.title,
      });
      state.isCourseCreating = false;
      console.log("builder fullfil", action.payload);
    });
    builder.addCase(createCourse.pending, (state, action) => {
      state.isCourseCreating = true;
    });
    builder.addCase(createCourse.rejected, (state, action) => {
      toast({
        title: action.payload,
        variant: "destructive",
      });
      state.isCourseCreating = false;
      return state;
    });
    //Create Stream
    builder.addCase(createStream.fulfilled, (state, action) => {
      toast({
        title: "New stream created!",
        description: action.payload.title,
      });
      state.isStreamCreating = false;
      console.log("builder fullfil", action.payload);
    });
    builder.addCase(createStream.pending, (state, action) => {
      state.isStreamCreating = true;
    });
    builder.addCase(createStream.rejected, (state, action) => {
      toast({
        title: action.payload,
        variant: "destructive",
      });
      state.isStreamCreating = false;
      return state;
    });
    //Create Semester
    builder.addCase(createSemester.fulfilled, (state, action) => {
      toast({
        title: "New semester created!",
        description: action.payload.title,
      });
      state.isSemesterCreating = false;
      console.log("builder fullfil", action.payload);
    });
    builder.addCase(createSemester.pending, (state, action) => {
      state.isSemesterCreating = true;
    });
    builder.addCase(createSemester.rejected, (state, action) => {
      toast({
        title: action.payload,
        variant: "destructive",
      });
      state.isSemesterCreating = false;
      return state;
    });
    //Create Subject
    builder.addCase(createSubject.fulfilled, (state, action) => {
      toast({
        title: "New subject created!",
        description: action.payload.title,
      });
      state.isSubjectCreating = false;
      console.log("builder fullfil", action.payload);
    });
    builder.addCase(createSubject.pending, (state, action) => {
      state.isSubjectCreating = true;
    });
    builder.addCase(createSubject.rejected, (state, action) => {
      toast({
        title: action.payload,
        variant: "destructive",
      });
      state.isSubjectCreating = false;
      return state;
    });
  },
});

export const { setUniversities, setNote } = dataSlice.actions;
export default dataSlice.reducer;
