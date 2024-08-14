import { createSlice } from "@reduxjs/toolkit";
import { createUniversity } from "../async-actions/dataAction";
import { toast } from "@/components/ui/use-toast";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    universities: null,
    isUniveristyUploading: false,
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
    builder.addCase(createUniversity.fulfilled, (state, action) => {
      toast({
        title: "New university uploaded!",
        description: action.payload.title,
      });
      state.isUniveristyUploading = false;
      console.log("builder fullfil", action.payload);
    });
    builder.addCase(createUniversity.pending, (state, action) => {
      state.isUniveristyUploading = true;
    });
    builder.addCase(createUniversity.rejected, (state, action) => {
      toast({
        title: action.payload,
        variant: "destructive",
      });
      state.isUniveristyUploading = false;
      return state;
    });
  },
});

export const { setUniversities, setNote } = dataSlice.actions;
export default dataSlice.reducer;
