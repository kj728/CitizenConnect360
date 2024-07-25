import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { addView, AddViewResponse, IView, View } from "../../Models-Angular/Views";


export const ViewActions = createActionGroup({
    source: 'VIEW API',
    events: {
        //add view action
        'add View': props<{ newView: addView }>(),
        'add View success': props<{ response: AddViewResponse }>(),
        'add View failure': props<{ message: string }>(),

        //get views action
        'get': emptyProps(),
        'get View success': props<{ response: View[] }>(),
        'get View failure': props<{ message: string }>(),

        //get specific view
        'get specificView': props<{ id: string }>(),
        'get specificView success': props<{ view: View }>(),
        'get specificView failure': props<{ message: string }>(),


    }


})