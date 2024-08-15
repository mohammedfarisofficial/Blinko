import { createSlice } from "@reduxjs/toolkit";
import { createCourse, createUniversity } from "../async-actions/dataAction";
import { toast } from "@/components/ui/use-toast";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    universities: null,
    isUniveristyCreating: false,
    isCourseCreating: false,
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
  },
});

export const { setUniversities, setNote } = dataSlice.actions;
export default dataSlice.reducer;
