import { createSelector } from "@ngrx/store";

export const selectState = () =>
    createSelector(
        (state, props) => state
    );