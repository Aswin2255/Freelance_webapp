import { createSlice } from "@reduxjs/toolkit";
const Jobslice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
  },
  reducers: {
    getAlljob(state, action) {
      state.jobs = action.payload.data;
    },
  },
});

export const jobaction = Jobslice.actions;
export default Jobslice;
